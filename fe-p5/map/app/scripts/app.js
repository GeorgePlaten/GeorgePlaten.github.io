/// <reference path="../../typings/knockout/knockout.d.ts"/>
/// <reference path="../../typings/gmaps/google.maps.d.ts"/>
var app = app || {};

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

        // center the map based on li clicks
        this.centerMapOnMarker = function (sighting) {
            var markerName = sighting.species();
            app.gMap.reCenterToMarker(markerName);
        };
        
        this.mapMarkerBounce = function (sighting) {
            var markerName = sighting.species();
            app.gMap.markerBounce(markerName);
        };
        
        this.mapMarkerBeStill = function (sighting) {
            var markerName = sighting.species();
            app.gMap.markerBeStill(markerName);
        };
        
        this.mapMarkerToggleBounce = function (sighting) {
            var markerName = sighting.species();
            app.gMap.markerToggleBounce(markerName);
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
        
        markerBounce: function (markerName) {
            var marker = this.markers[markerName];
            this.map.panTo(marker.position);
        },

        markerBeStill: function (markerName) {
            var marker = this.markers[markerName];
            this.map.panTo(marker.position);
        },

        markerToggleBounce: function (markerName) {
            var marker = this.markers[markerName];
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        },
        
        renderMarker: function (isVisible, species, location) {
            if (isVisible) {
                this.markers[species] = new google.maps.Marker({
                    position: location,
                    // icon: icons[feature.type].icon,
                    title: species,
                    // animation: google.maps.Animation.DROP, // causes a flash in wrong place
                    map: this.map
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