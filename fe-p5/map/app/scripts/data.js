/// <reference path="../../typings/jquery/jquery.d.ts"/>
var app = app || {};

(function () {
    'use strict';

    app.data = {};
    
    // Static psuedodata to simulate a collection built by user input
    app.data.sightings = [
        {
            name: 'Erithacus rubecula',
            lat: -33.844263,
            lng: 151.113756
        },
        {
            name: 'Fuchsia magellanica',
            lat: -33.844548,
            lng: 151.110811
        },
        {
            name: 'Polyommatus icarus',
            lat: -33.845096,
            lng: 151.113337
        },
        {
            name: 'Geranium robertianum',
            lat: -33.844717,
            lng: 151.110467
        },
        {
            name: 'Arenaria interpres',
            lat: -33.844948,
            lng: 151.111011
        },
        {
            name: 'Marchantia polymorpha',
            lat: -33.845343,
            lng: 151.110789
        }
    ];
    
    app.data.sightingNames = app.data.sightings.map(
        function (sighting) {return sighting.name;}
    );

    var parseWikiTaxoProp = function (text, prop) {
        if (text.indexOf(prop + ' = ') === -1) {
            return 'Property "' + prop + '" not found';
        } else {
            var str = text.substring(text.indexOf(prop + ' = ') + prop.length + 3);
            return str.substring(0, str.indexOf('\u000A'));
        }
    };

    var getTaxon = function (text) {
        var taxon = {};
        switch (parseWikiTaxoProp(text, 'regnum')) {
            case '[[Plant]]ae':
                taxon.kingdom = "Plant";
                switch (parseWikiTaxoProp(text, 'unranked_divisio')) {
                    case '[[Angiosperms]]':
                        taxon.division = "Flowering Plant";
                        break;
                    default: break;
                }
                break;
            case '[[Animal]]ia':
                taxon.kingdom = 'Animal';
                switch (parseWikiTaxoProp(text, 'classis')) {
                    case '[[Insect]]a':
                        taxon.class = "Insects";
                        switch (parseWikiTaxoProp(text, 'ordo')) {
                            case '[[Lepidoptera]]':
                                taxon.order = "Butterflies";
                                break;
                            default: break;
                        }
                        break;
                    case '[[bird|Aves]]':
                    case '[[Aves]]':
                        taxon.class = "Bird";
                        break;
                    default: break;
                }
                break;
            default: break;
        }
        return taxon;
    };

    app.data.wikipedia = {};

    var processWikipediaData = function (data) {
        var collection = data.query.pages;
        var redirects = data.query.redirects;
        for (var page in collection) {
            // ensure exact name matching with original data and
            // Wikipedia enhanced data
            var species = collection[page].title;
            for (var i = 0, len = redirects.length; i < len; i++) {
                if (species === redirects[i].to) {
                    species = redirects[i].from;
                }
            }

            var text = collection[page].revisions[0]['*'];
            var extract = collection[page].extract;
            var url = collection[page].canonicalurl;
            var taxon = getTaxon(text);
            app.data.wikipedia[species] = {
                'extract': extract,
                'url': url,
                'text': text,
                'taxon': taxon
            };
            console.log(url, name, taxon);
        }
        app.wpEnhancedAvailable = true;
    };

    var getWikipediaData = function () {
        var baseUrl = 'https://en.wikipedia.org//w/api.php?action=query&format=json' +
            '&redirects=&prop=revisions|extracts|info&rvprop=content&rvsection=0' +
            '&exlimit=max&exintro=&excontinue=true&inprop=url';
        var pages = app.data.sightingNames.join('|');
        jQuery.ajax({
            url: baseUrl + '&titles=' + pages,
            dataType: 'jsonp',
            success: processWikipediaData
        });
    };

    getWikipediaData(); // initialize
    
    app.data.flickr = {};
    
    var processFlickrRequest = function (data) {
        var obj = {};
        var photo = data.photos.photo;
        obj.src = photo// TODO: process each photo
        return photo;
    };

    var doflickrRequest = function (name) {
        var baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
            '&api_key=5f1bda0ff51d35493f69a98774a10279&safe_search=1&content_type=1' +
            '&extras=url_q&per_page=10&page=1&format=json&nojsoncallback=1';
        jQuery.ajax({
            url: baseUrl + '&text=' + name,
            dataType: 'json',
            success: function (data) {
                app.data.flickr[name] = processFlickrRequest(data);
            }
        });
    };
    
    var getFlickrData = function () {
        app.data.sightingNames.map(function (name) {
            doflickrRequest(name);
        });
    };
    
    getFlickrData();
    
})();