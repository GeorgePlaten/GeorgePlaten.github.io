/**
 * @fileoverview Base application elements:
 * - namespace definition
 * - error check for critical google map loading
 * - UI event listeners
 * @author <a href="http://georgeplaten.github.com">George Platen</a>
 * @version 0.1.1
 */

/// <reference path='../../typings/jquery/jquery.d.ts'/>
/// <reference path='../../typings/knockout/knockout.d.ts'/>
/// <reference path='../../typings/gmaps/google.maps.d.ts'/>
/// <reference path='views.js'/>

/**
 * The application namespace
 * @namespace
 */
var app = app || {
    data: {
        species: {},
        currentSighting: null
    }
};

(function () {
    'use strict';
    
    app.apikeys = {
        FLICKR: '22dec05ae90cf0e92ca4146d2d14761c',
        gmaps: ''
    };

    // Add a notice if Google maps fails to load in 8 seconds
    setTimeout(function () {
        $('#map-canvas').find('h2').text() && $('#map-canvas').find('h2').text(
            'Unable to reach Google Maps, please try reloading the page');
        }, 8000);

    // UI Buttons
    $('#add-new').on({'click': function () {
        app.newSighting();
    }});
    
    $('#save-new').on({'click': function () {
        app.saveNewSighting();
    }});
    
    $('#message-button').on({'click': function () {
        app.undoLastEntry();
    }});

})();
