/// <reference path="../../typings/jquery/jquery.d.ts"/>
var app = app || {};

(function () {
    'use strict';

    app.data = {};
    
    // Static 'starter' psuedodata to simulate a collection built by user input
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

    app.data.addKeywords = function (species, keywords) {
        for (var i = 0, len = app.data.sightings.length; i < len; i++) {
            if (app.data.sightings[i].name === species) {
                app.data.sightings[i].keywords += (', ' + keywords.toLowerCase());
            }
        }
    };

    for (var i = 0, len = app.data.sightings.length; i < len; i++) {
        app.data.sightings[i].keywords = '';
        app.data.addKeywords(app.data.sightings[i].name, app.data.sightings[i].name);
    };

    var parseWikiTaxoProp = function (text, prop) {
        if (text.indexOf(prop) === -1) {
            return 'Property "' + prop + '" not found';
        } else {
            var str = text.substring(text.indexOf(prop) + prop.length).replace(/ /g, '');
            return str.substring(str.indexOf('=') + 1, str.indexOf('\u000A'));
        }
    };

    var getTaxon = function (text) {
        var taxon = {};
        switch (parseWikiTaxoProp(text, 'regnum')) {
            case '[[Plant]]ae':
                taxon.kingdom = "plants";
                switch (parseWikiTaxoProp(text, 'unranked_divisio')) {
                    case '[[Angiosperms]]':
                        taxon.division = "flowering plants";
                        break;
                    default: break;
                }
                break;
            case '[[Animal]]ia':
                taxon.kingdom = 'animals';
                switch (parseWikiTaxoProp(text, 'classis')) {
                    case '[[Insect]]a':
                        taxon.class = "insects";
                        switch (parseWikiTaxoProp(text, 'ordo')) {
                            case '[[Lepidoptera]]':
                                taxon.order = "butterflies and moths";
                                break;
                            default: break;
                        }
                        break;
                    case '[[bird|Aves]]':
                    case '[[Aves]]':
                        taxon.class = "birds";
                        break;
                    default: break;
                }
                break;
            default:
                taxon.kingdom = 'unknown';
                break;
        }
        return taxon;
    };

    app.data.wikipedia = {};

    var processWikipediaData = function (data) {
        var collection = data.query.pages;
        var redirects = data.query.redirects;
        var bTagStripper = function (html) {
            return html.replace(/<\/?b>/g, '').toLowerCase();
        };
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
            var $infoWindowHTML = $('<div>')
                .append($('<h3>').text(species))
                .append($('<div>').html(extract))
                .append($('<p>')
                    .append($('<a>').attr('href', url).text('[Wikipedia]')));

            var taxon = getTaxon(text);
            
            // code from http://stackoverflow.com/a/11592042
            var commonNames = extract.match(/<b>(.*?)<\/b>/g).map(bTagStripper);

            app.data.wikipedia[species] = {
                'iwHTML': $infoWindowHTML[0],
                'url': url,
                'taxon': taxon,
                'commonNames': commonNames,
                'fullText': text
            };
            for (var key in taxon) {
                app.data.addKeywords(species, taxon[key]);
            }
        }
        app.wpEnhancedAvailable = true;
    };

    app.getWikipediaData = function (species, callback) {
        var baseUrl = 'https://en.wikipedia.org//w/api.php?action=query&format=json' +
            '&redirects=&prop=revisions|extracts|info&rvprop=content&rvsection=0' +
            '&exlimit=max&exintro=&excontinue=true&inprop=url';
        var sightingNames = species ? [species] : app.data.sightings.map(
            function (sighting) { return sighting.name; }
            );
        var pages = sightingNames.join('|');
        jQuery.ajax({
            url: baseUrl + '&titles=' + pages,
            dataType: 'jsonp',
            success: function (data) {
                processWikipediaData(data);
                callback ? callback() : null ;
            }
        });
    };

    app.getWikipediaData(); // initialize
    
    app.data.flickr = {};

    app.flickr = {

        processData: function (flickrJSON) {
            var flickrPhotos = flickrJSON.photos.photo;
            var photos = [];
            var fPhoto;
            for (var i = 0, len = flickrPhotos.length; i < len; i++) {
                var photo = {};
                fPhoto = flickrPhotos[i];
                photo.src = fPhoto.url_q;
                photo.title = (fPhoto.title || 'untitled');
                photo.url = 'https://www.flickr.com/photos/' +
                fPhoto.owner + '/' + fPhoto.id;
                photos.push(photo);
            }
            return photos;
        },

        // flickr only allows one request per search term
        // using temp API key from API explorer, actual key: 
        doRequest: function (name) {
            var apikey = 'ffbb6a893d3a5018cd56e1c743828642';
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
                '&api_key=' + apikey + '&safe_search=1&content_type=1' +
                '&extras=url_q&per_page=6&page=1&format=json&nojsoncallback=1';
            jQuery.ajax({
                url: url + '&text=' + name,
                dataType: 'json',
                success: function (data) {
                    app.data.flickr[name] = this.processData(data);
                }.bind(this)
            });
        },
    
        // do all Flickr requests
        getData: function () {
            var names = app.data.sightings.map(
                function (sighting) { return sighting.name; }
                );
            for (var i = 0, len = names.length; i < len; i++) {
                this.doRequest(names[i]);
            }
        }

    };

    app.flickr.getData();

})();