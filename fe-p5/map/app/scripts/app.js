/// <reference path='../../typings/jquery/jquery.d.ts'/>
/// <reference path='../../typings/knockout/knockout.d.ts'/>
/// <reference path='../../typings/gmaps/google.maps.d.ts'/>
var app = app || {
    data: {
        species: {},
        currentSighting: null
    }
};

(function () {
    'use strict';
    
    app.apikeys = {
        FLICKR: 'fd4290ed8c9c34724a6f5bd509d1ab7b',
        gmaps: ''
    };

    // Add a notice if Google maps fails to load in 8 seconds
    setTimeout(function () {
        $('#map-canvas').find('h2').text() && $('#map-canvas').find('h2').text(
            'Unable to reach Google Maps, please try reloading the page');
        }, 8000);

    // UI Buttons
    $('#addNew').on({'click': function () {
        app.newSighting();
    }});
    $('#saveNew').on({'click': function () {
        app.saveNewSighting();
    }});
    $('#messageButton').on({'click': function () {
        app.undoLastEntry();
    }});

})();
