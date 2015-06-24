/// <reference path="../../typings/knockout/knockout.d.ts"/>
/// <reference path="../../typings/gmaps/google.maps.d.ts"/>
var app = app || {};

app.wpEnhancedAvailable = false;
app.flickrEnhancedAvailable = false;

(function () {
    'use strict';

    // ko.bindingHandlers.gMapFeature = {
    //     init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    //         // This will be called when the binding is first applied to an element
    //         // Set up any initial state, event handlers, etc. here
    //     },
    //     update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    //         // This will be called once when the binding is first applied to an element,
    //         // and again whenever any observables/computeds that are accessed change
    //         // Update the DOM element based on the supplied values here.
    //         console.log('element: ', element, '\n',
    //             'valueAccessorFn: ', valueAccessor, '\n',
    //             'valueAccessor: ', valueAccessor(), '\n',
    //             'valueAccessorUnwrapped: ', ko.unwrap(valueAccessor()), '\n',
    //             'allBindingsFn: ', allBindings, '\n',
    //             'allBindings: ', allBindings(), '\n',
    //             'allBindingsUnwrapped: ', ko.unwrap(allBindings()), '\n',
    //             'viewModel: ', viewModel, '\n',
    //             'bindingContext: ', bindingContext, '\n',
    //             'species: ', bindingContext.$data.species(), '\n',
    //             'visibility: ', bindingContext.$data.isVisible());
    //     }
    // };

    app.SightingModel = function (species, commonName, lat, lng) {
        this.species = ko.observable(species);
        this.commonName = ko.observable(commonName);
        this.location = new google.maps.LatLng(lat, lng);
        this.isVisible = ko.observable(false);
        this.drawMapMarker = function () {
            app.gMap.renderMarker(this.isVisible(), this.species(), this.location);
        };
    };

    app.ViewModel = function (data) {
        // observable array of all sightings
        this.sightings = ko.observableArray(data.map(function (sighting) {
            return new app.SightingModel(sighting.name, sighting.commonName,
                sighting.lat,sighting.lng);
        }));
        
        // text string to filter sightings
        this.filterStr = ko.observable('');
        
        // all filtered sightings
        this.filteredSightings = ko.computed(function () {
            return this.sightings().filter(function (sighting) {
                sighting.isVisible(sighting.species().indexOf(this.filterStr()) >= 0);
                return sighting.isVisible();
            }.bind(this));
        }.bind(this));

        // center the map or display InfoWindow based on li clicks
        this.triggerMarkerClick = function (sighting) {
            var markerName = sighting.species();
            google.maps.event.trigger(app.gMap.markers[markerName], 'click');
        };
        
        this.mapMarkerHighlight = function (sighting) {
            var markerName = sighting.species();
            app.gMap.markerHighlight(markerName);
        };

    };

    app.gMap = {
        mapOptions: {
            center: { lat: -33.844, lng: 151.112 },
            zoom: 17
        },

        markers: {},

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
        
        customMarkers: {
            'Plant': 'images/plant.png',
            'Flowering Plant': 'images/flower.png',
            'Insects': 'images/insect.png',
            'Butterflies': 'images/butterfly.png',
            'Bird': 'images/bird.png'
        },
        
        infowindow: new google.maps.InfoWindow({
            content: "Info window content"
        }),
        
        renderMarker: function (isVisible, species, location) {
            if (isVisible) {
                var customMarker = null;
                // If Wikipedia data available,
                // Use a custom marker based on taxonomy 
                if (app.wpEnhancedAvailable) {
                    var taxon = app.data.wikipedia[species].taxon;
                    // assign a classification by first lowest found
                    // (least likely to most likely)
                    customMarker = this.customMarkers[(taxon.order ||
                        taxon.class || taxon.division || taxon.kingdom)];
                }
                this.markers[species] = new google.maps.Marker({
                    position: location,
                    icon: customMarker,
                    title: species,
                    map: this.map
                });
                // Add an event listener to the marker toggle InfoWindow or center map
                google.maps.event.addListener(app.gMap.markers[species], 'click', function () {
                    if (app.wpEnhancedAvailable) {
                        var iw = app.gMap.infowindow;
                        var currentContent = iw.getContent();
                        var newContent = app.data.wikipedia[species].extract;
                        // let the user toggle the InfoWindow
                        if (currentContent !== newContent) {
                            // there is only one infowindow, so set content with each click
                            iw.setContent(newContent) ;
                            iw.open(app.gMap.map, this);
                        } else {
                            iw.setContent('');
                            iw.close();
                        }
                        google.maps.event.addListener(iw, 'closeclick', function () {
                            iw.setContent('');
                        });
                    } else {
                        app.gMap.reCenterToMarker(species);
                    }
                });
            } else {
                this.markers[species].setMap(null);
            }
        },


    };
    

})();

// initialize google map
var initializeGmap = function () {
    app.gMap.map = new google.maps.Map(document.getElementById('map-canvas'),
        app.gMap.mapOptions);
};
google.maps.event.addDomListener(window, 'load', initializeGmap);

// initialize knockout js
window.onload = function (event) {
    var viewModel = new app.ViewModel(app.data.sightings);
    ko.applyBindings(viewModel);
};