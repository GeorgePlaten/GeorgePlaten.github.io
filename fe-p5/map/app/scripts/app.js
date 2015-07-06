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
        this.isVisible = ko.observable(false);
        this.drawMapMarker = function () {
            app.gMap.renderMarker(this.isVisible(), this.species(), this.location);
        };
        this.pictures = ko.observableArray(app.data.flickr[species]);
        this.taxon = function () {
            var arr = [];
            var taxon = app.data.wikipedia[species].taxon;
            for (var key in taxon) {
                arr.push(key + ': ' + taxon[key]);
            }
            return arr.join(' | ');
        }();
        this.keywords = species + this.taxon;
        this.commonNames = 'Also known as: ' + 
            app.data.wikipedia[species].commonNames.join(', ') + '.';
    };

    app.ViewModel = function (data) {
        
        // observable array of all sightings
        this.sightings = ko.observableArray(data.map(function (sighting) {
            return new app.SightingModel(sighting.name, sighting.lat, sighting.lng);
        }));
        
        // text string to filter sightings
        this.filterStr = ko.observable('');
        
        // all sightings: filtered
        this.filteredSightings = ko.computed(function () {
            return this.sightings().filter(function (sighting) {
                sighting.isVisible(
                    sighting.keywords.indexOf(this.filterStr().toLowerCase()) >= 0
                );
                return sighting.isVisible();
            }.bind(this));
        }.bind(this));
        
        // this.listClick = function (sighting) {
        //     var species = sighting.species();
        //     this.filterStr() === species ? this.filterStr('') : this.filterStr = species;
        //     // send a click event to the map marker
        //     google.maps.event.trigger(app.gMap.markers[species], 'click');
        // };

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
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.TERRAIN
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
            'unknown': 'images/blank.png',
            'plants': 'images/plant.png',
            'animals': 'images/animal.png',
            'flowering plants': 'images/flower.png',
            'insects': 'images/insect.png',
            'butterflies and moths': 'images/butterfly.png',
            'birds': 'images/bird.png',
            'newUserMarker': 'images/sblank.png'
        },

        infowindow: new google.maps.InfoWindow({ content: '' }),

        toggleInfoWindow: function (species) {
            var iw = this.infowindow;
            var currentContent = iw.getContent();
            var newContent = app.data.wikipedia[species].iwHTML;
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
                // Add an click event listener to the marker
                google.maps.event.addListener(this.markers[species], 'click', function (e) {
                    this.markerClicked(species);
                }.bind(this));
            } else {
                this.markers[species].setMap(null);
            }
        },
        
        newSighting: function () {
            this.map.panTo(this.mapOptions.center);
            this.markers.newUserMarker = new google.maps.Marker({
                position: this.mapOptions.center,
                map: this.map,
                draggable: true,
                icon: this.appMarkers.newUserMarker,
                title: 'Drag me and enter a life-form binomial!"'
            });
            var marker = this.markers.newUserMarker;
            
            // Render the InfoWindow
            this.infowindow.setContent(marker.title + 
                '<div id="iwInput">' + 
                    '<input id="search" type="text" placeholder="Try \'Rattus\'">' +
                '</div>');
            this.infowindow.open(this.map, marker);
            
            // add enter key keyup event handler to save data
            // TODO: Change this to *actually* listen for key events
            google.maps.event.addListener(marker, 'click', function () {
                var name = $('#search')[0].value;
                if (name.length < 3) {
                    var messages = [ // TODO: improve this shit
                        'Type in a species name in <a href="https://en.wikipedia.org/wiki/Binomial_nomenclature">binomial</a> form.',
                        'Try something like \'Rattus norvegicus\'',
                        'Or dimiss this box, by clicking the cross.'
                    ];
                    $('#iwInput').append('<br>' + messages.join('<br>'));
                    return;
                } else {
                    name = name[0].toUpperCase() + name.slice(1);
                }
                this.saveNewSighting(name, marker.getPosition());
                this.infowindow.setContent('');
                marker.setMap(null);
            }.bind(this));
        },
        
        saveNewSighting: function (name, location) {
                        
            app.data.sightings.push({
                'name': name,
                'lat': location.A,
                'lng': location.F
            });
            
            var addit = function () {
                var s = app.data.sightings;
                var l = s.length - 1;
                var nw = s[l];
                app.viewModel.sightings().push(
                    new app.SightingModel(nw.name, nw.lat, nw.lng, '')
                );
                app.viewModel.filterStr('mm');
                app.viewModel.filterStr('');
            };
            
            app.getWikipediaData(name, addit);
            
        }
            

    };
    
    // add listener to InfoWindow close button to clear content too
    google.maps.event.addListener(app.gMap.infowindow, 'closeclick', function () {
        app.gMap.infowindow.setContent('');
        $('#photos').remove();
        app.gMap.setCurrentMarker('');
    });
    
    // temp
    $('#addNew').on({'click': function () {
        app.gMap.newSighting();
    }});

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