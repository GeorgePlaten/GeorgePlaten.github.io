/// <reference path="../../typings/knockout/knockout.d.ts"/>
var app = app || {};

(function () {
    'use strict';
    
    app.Sighting = function (species, lat, lng) {
        this.species = ko.observable(species);
        this.location = new google.maps.LatLng(lat, lng);
    };
    
    app.ViewModel = function (data) {
        
        this.sightings = ko.observableArray(data.map(function (sighting) {
            return new app.Sighting(sighting.name, sighting.lat, sighting.lng);
        }));
        
        this.filter = ko.observable("");
        
        this.addToMap = function () {
            
        }.bind(this);
    };
    
    
})();

var viewModel = new app.ViewModel(app.data);
ko.applyBindings(viewModel);