/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/knockout/knockout.d.ts"/>
/// <reference path="../../typings/gmaps/google.maps.d.ts"/>
var app = app || {};

app.wpEnhancedAvailable = false;

(function () {
    'use strict';

    app.SightingModel = function (species, lat, lng, keywords) {
        this.species = ko.observable(species);
        this.location = new google.maps.LatLng(lat, lng);
        this.keywords = ko.observable(keywords);
        this.isVisible = ko.observable(false);
        this.drawMapMarker = function () {
            app.gMap.renderMarker(this.isVisible(), this.species(), this.location);
        };
        this.pictures = ko.observableArray(app.data.flickr[species]);
    };

    app.ViewModel = function (data) {
        
        // observable array of all sightings
        this.sightings = ko.observableArray(data.map(function (sighting) {
            return new app.SightingModel(sighting.name,
                sighting.lat, sighting.lng, sighting.keywords);
        }));
        
        // text string to filter sightings
        this.filterStr = ko.observable('');
        
        // all sightings: filtered
        this.filteredSightings = ko.computed(function () {
            return this.sightings().filter(function (sighting) {
                sighting.isVisible(
                    sighting.keywords().indexOf(this.filterStr().toLowerCase()) >= 0
                );
                return sighting.isVisible();
            }.bind(this));
        }.bind(this));
        

        // send a click event to the map marker
        this.triggerMarkerClick = function (sighting) {
            var markerName = sighting.species();
            google.maps.event.trigger(app.gMap.markers[markerName], 'click');
        };
        
        // highlight the map marker when hovering on list item
        this.mapMarkerHighlight = function (sighting) {
            var markerName = sighting.species();
            app.gMap.markerHighlight(markerName);
        };

        this.currentSighting = ko.observable();

        this.flickrPhotos = ko.computed(function () {
            return app.data.flickr[this.currentSighting()];
        }.bind(this));

    };

    app.gMap = {
        mapOptions: {
            center: { lat: -33.844, lng: 151.112 },
            zoom: 17
        },

        markers: {},

        currentMarker: '',

        setCurrentMarker: function (markerName) {
            var marker = this.markers[this.currentMarker];
            if (markerName === '' || markerName === this.currentMarker) {
                // Clear the current marker (empty || toggled)
                app.wpEnhancedAvailable ?
                    marker.setIcon('images/' + marker.getIcon().substr(8)) : null;
                this.currentMarker = '';
                this.map.panTo(this.mapOptions.center);
                this.map.setZoom(this.mapOptions.zoom);
                app.viewModel.currentSighting('');
            } else {
                // turn off current marker
                if (this.currentMarker && app.wpEnhancedAvailable) {
                    marker.setIcon('images/' + marker.getIcon().substr(8));
                }
                // set a new current marker
                marker = this.markers[markerName];
                this.currentMarker = markerName;
                app.wpEnhancedAvailable ?
                    marker.setIcon('images/s' + marker.getIcon().substr(7)) : null;
                app.viewModel.currentSighting(markerName);
            }
        },

        reCenterToMarker: function (markerName) {
            var marker = this.markers[markerName];
            this.map.panTo(marker.position);
        },

        markerHighlight: function (markerName) {
            var marker = this.markers[markerName];
            // Toggle bounce animation
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        },

        appMarkers: {
            'Plant': 'images/plant.png',
            'Flowering Plant': 'images/flower.png',
            'Insects': 'images/insect.png',
            'Butterflies': 'images/butterfly.png',
            'Bird': 'images/bird.png'
        },

        infowindow: new google.maps.InfoWindow({ content: '' }),

        toggleInfoWindow: function (species) {
            var iw = this.infowindow;
            var currentContent = iw.getContent();
            var newContent = app.data.wikipedia[species].extract;
            // let the user toggle the InfoWindow
            if (currentContent !== newContent) {
                // there is only one infowindow, so set content with each click
                iw.setContent(newContent);
                iw.open(this.map, this.markers[species]);
            } else {
                // clear content with close to enable toggle logic
                iw.setContent('');
                iw.close();
            }
        },

        markerClicked: function (species) {
            if (app.wpEnhancedAvailable) {
                this.toggleInfoWindow(species);
            } else {
                this.reCenterToMarker(species);
            }
            this.setCurrentMarker(species);
        },

        renderMarker: function (isVisible, species, location) {
            if (isVisible) {
                var customMarker = null;
                // If Wikipedia data available,
                // Use a custom marker based on taxonomy 
                if (app.wpEnhancedAvailable) {
                    var taxon = app.data.wikipedia[species].taxon;
                    // assign a classification by first lowest found
                    // (least likely to most likely)
                    customMarker = this.appMarkers[(taxon.order ||
                        taxon.class || taxon.division || taxon.kingdom)];
                }
                this.markers[species] = new google.maps.Marker({
                    position: location,
                    icon: customMarker,
                    title: species,
                    map: this.map
                });
                
                // Add an event listener to the marker toggle InfoWindow or center map
                google.maps.event.addListener(this.markers[species], 'click', function (e) {
                    this.markerClicked(species);
                }.bind(this));
            } else {
                this.markers[species].setMap(null);
            }
        },
        
        newSighting: function () {
            var marker = new google.maps.Marker({
                position: this.mapOptions.center,
                map: this.map,
                draggable: true,
                title: "Drag me and enter a lifeform binomial!"
            });
            this.infowindow.setContent(marker.title + 
                '<p><input type="text" data-bind="textInput: newSighting"></p>');
            this.infowindow.open(this.map, marker);
        }

    };
    
    // add listener to InfoWindow close button to clear content too
    google.maps.event.addListener(app.gMap.infowindow, 'closeclick', function () {
        app.gMap.infowindow.setContent('');
        $('#photos').remove();
        app.gMap.setCurrentMarker('');
    });

})();

// initialize google map
var initializeGmap = function () {
    app.gMap.map = new google.maps.Map(document.getElementById('map-canvas'),
        app.gMap.mapOptions);
};
google.maps.event.addDomListener(window, 'load', initializeGmap);

// initialize knockout js
window.onload = function (event) {
    app.viewModel = new app.ViewModel(app.data.sightings);
    ko.applyBindings(app.viewModel);
};