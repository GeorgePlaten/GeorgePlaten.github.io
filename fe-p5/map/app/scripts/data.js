/// <reference path="../../typings/jquery/jquery.d.ts"/>
var app = app || {};

var Species = function (data) {
    this.binomial = data.name;
    this.keywords = data.name;
    this.sightings = [];
    this.wm = {}; //
    this.pics = []; //
};

Species.prototype.addKeyword = function (str) {
    this.keywords += ', ' + str.toLowerCase();
};

Species.prototype.setWikimedia = function (obj) {
    this.wm = obj;
};

Species.prototype.setFlickr = function (arr) {
    this.pics = arr;
};

var Sighting = function (data) {
    var name = data.name;
    var markerOptions = {
        position: new google.maps.LatLng(data.lat, data.lng),
        title: name,
        icon: 'images/blank.png',
        icons: {
            selected: 'images/sblank.png',
            unselected: 'images/blank.png'
        },
        map: null
    };
    this.marker = new google.maps.Marker(markerOptions);
    var markerClicked = function () {
        app.gMap.toggleInfoWindow(name, this.marker);
        this.selection();
    }.bind(this);
    google.maps.event.addListener(this.marker, 'click', markerClicked);
};

Sighting.prototype.toggleMarker = function () {
    this.marker.getMap() ? this.marker.setMap(null) : this.marker.setMap(app.gMap.map);
};

Sighting.prototype.selection = function () {
    app.currentMarker === this ? this.deselect(true) : this.select();
    app.viewModel.toggleFlickrPhotos(app.species[this.marker.title].pics);
};

Sighting.prototype.deselect = function (recenter) {
    app.currentMarker = '';
    if (recenter) {
        app.gMap.map.panTo(app.gMap.mapOptions.center)
    }
    if (this.marker.getIcon()) {
        this.marker.setIcon(this.marker.icons.unselected);
    }
};

Sighting.prototype.select = function () {
    if (app.currentMarker) {app.currentMarker.deselect()}
    app.currentMarker = this;
    if (this.marker.getIcon()) {
        this.marker.setIcon(this.marker.icons.selected);
    }
};

app.currentMarker = '';

(function () {
    'use strict';

    app.data = {};
    
    // Static 'starter' psuedodata to simulate a collection built by user input
    app.data.basic = [
        {
            name: 'Erithacus rubecula',
            lat: -33.844263,
            lng: 151.113756
        },
        {
            name: 'Erithacus rubecula',
            lat: -33.843263,
            lng: 151.111756
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

    // wm = Wikimedia, (the Wikipedia superset)
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

            // app.data.wikipedia[species] = {
            //     'iwHTML': $infoWindowHTML[0],
            //     'url': url,
            //     'taxon': taxon,
            //     'commonNames': commonNames,
            //     'fullText': text
            // };
            var current = app.species[species];
            current.wm = {
                'iwHTML': $infoWindowHTML[0],
                'url': url,
                'taxon': taxon,
                'commonNames': commonNames
            };
            for (var key in taxon) {
                current.addKeyword(taxon[key]);
            }
            for (var i = 0, len = commonNames.length; i < len; i++) {
                current.addKeyword(commonNames[i]);
            }
            var sightings = current.sightings;
            var marker;
            var taxoIcon = (taxon.order || taxon.class || taxon.division || taxon.kingdom);
            for (var i = 0, len = sightings.length; i < len; i++) {
                marker = sightings[i].marker;
                marker.icons.selected = app.customIcons[taxoIcon + '-s'];
                marker.icons.unselected = app.customIcons[taxoIcon];
                marker.setIcon(app.customIcons[taxoIcon]);
            }
        }
    };

    // Wikimedia prefer to have multiple queries batched into a single request
    app.getWikipediaData = function (species, callback) {
        var baseUrl = 'https://en.wikipedia.org//w/api.php?action=query&format=json' +
            '&redirects=&prop=revisions|extracts|info&rvprop=content&rvsection=0' +
            '&exlimit=max&exintro=&excontinue=true&inprop=url';
        // if species parameter is given, put it in an array
        var sightingNames = species ? [species] :
            // else if no parameter given, 
            // put all sightings from app.data.basic in the array
            app.data.basic.map(function (sighting) { return sighting.name; });
        var pages = sightingNames.join('|'); // Wikimedia batch format
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
    
    app.species = {};
    
    app.addNewSpecies = function (data) {
        if (!app.species[data.binomial]) {
            app.species[data.binomial] = data;
        }
    };
    
    app.addNewSighting = function (data) {
        var species = data.marker.title;
        if (app.species[species]) {
            app.species[species].sightings.push(data);
        }
    };
        
    app.newSighting = function (data) {
        app.addNewSpecies( new Species(data) );
        app.addNewSighting( new Sighting(data) );
    };
        
    app.initSpecies = function () {
        var basic = app.data.basic;
        for (var i = 0, len = basic.length; i < len; i++) {
            app.newSighting(basic[i]);
        }
    };

    // app.data.addKeywords = function (species, keywords) {
    //     for (var i = 0, len = app.data.basic.length; i < len; i++) {
    //         if (app.data.basic[i].name === species) {
    //             app.data.basic[i].keywords += (', ' + keywords.toLowerCase());
    //         }
    //     }
    // };

    // app.data.allNamesToKeywords = function () {
    //     for (var i = 0, len = app.data.basic.length; i < len; i++) {
    //         app.data.basic[i].keywords = '';
    //         app.data.addKeywords(app.data.basic[i].name, app.data.basic[i].name);
    //     }
    // }();


    
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
        // (using temp API key from API explorer) 
        doRequest: function (name) {
            var apikey = '2f1d2a8780c03c0e032188160456744a';
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
                '&api_key=' + apikey + '&safe_search=1&content_type=1' +
                '&extras=url_q&per_page=6&page=1&format=json&nojsoncallback=1';
            jQuery.ajax({
                url: url + '&text=' + name,
                dataType: 'json',
                success: function (data) {
                    app.species[name].pics = this.processData(data);
                }.bind(this)
            });
        },
    
        // do all Flickr requests
        getData: function () {
            var names = app.data.basic.map(
                function (sighting) { return sighting.name; }
                );
            for (var i = 0, len = names.length; i < len; i++) {
                this.doRequest(names[i]);
            }
        }

    };

    app.flickr.getData();

})();

    app.initSpecies();