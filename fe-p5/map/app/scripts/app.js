/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/knockout/knockout.d.ts"/>
/// <reference path="../../typings/gmaps/google.maps.d.ts"/>
var app = app || {};

// app.wpEnhancedAvailable = false;

(function () {
    'use strict';

    app.SpeciesModel = function (species) {
        this.species = ko.observable(species.binomial);
        this.keywords = species.keywords.toLowerCase();
        // this.location = new google.maps.LatLng(lat, lng);
        this.isVisible = ko.observable(false);
        this.sightings = species.sightings;
        this.drawMapMarker = function () {
            // app.gMap.renderMarker(this.isVisible(), this.species(), this.location); // can go
            var map;
            this.isVisible() ? map = app.gMap.map : map = null;
            for (var i = 0, len = this.sightings.length; i < len; i++) {
                this.sightings[i].marker.setMap(map);
            }
        };
        this.pictures = species.pics;
        this.taxon = function () {
            if (species.wm.taxon) {
                var arr = [];
                var taxon = species.wm.taxon;
                for (var key in taxon) {
                    arr.push(key + ': ' + taxon[key]);
                }
                return arr.join(' | ');
            } else {
                return ''; // failing silently
            }
        }.bind(this)();
        this.commonNames = (species.wm.commonNames) ? 'Also known as: ' + 
            species.wm.commonNames.join(', ') + '.' : '' ;
    };

    app.ViewModel = function (data) {
        
        // observable array of all species
        this.species = ko.observableArray(function () {
            var arr = [];
            for (var key in data) {
                arr.push(new app.SpeciesModel(data[key]));
            }
            return arr;
        }());
        
        // text string to filter sightings
        this.filterStr = ko.observable('');
        this.tempFilterStr = '';
        
        // filtered sightings: array
        this.filteredSpecies = ko.computed(function () {
            return this.species().filter(function (species) {
                species.isVisible(
                    species.keywords.indexOf(this.filterStr().toLowerCase()) >= 0
                );
                return species.isVisible();
            }.bind(this));
        }.bind(this));
        
        this.flickrPhotos = ko.observableArray();
        
        // list clicks not really suitable when there are multiple
        // sightings of the same species :(
        this.listClick = function (species) {
            this.toggleFilterStr(species.species());
            this.toggleFlickrPhotos(species.pictures)
            app.currentMarker ? app.currentMarker.deselect(true) : null;
            app.gMap.infowindow.setContent('');
            app.gMap.infowindow.close();
        }.bind(this);
        
        this.toggleFlickrPhotos = function (pictures) {
            this.flickrPhotos() === pictures ? this.flickrPhotos(null) : 
                this.flickrPhotos(pictures)
        };
        
        this.toggleFilterStr = function (str) {
            if (this.filterStr() === str) {
                this.filterStr(this.tempFilterStr);
            } else {
                this.tempFilterStr = this.filterStr();
                this.filterStr(str);
            }
        };
        
        // highlight the map marker when hovering on list item
        this.mapMarkerBounce = function (species) {
            var sightings = species.sightings;
            for (var i = 0, len = sightings.length; i < len; i++) {
                sightings[i].marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        };
        this.mapMarkerPuncture = function (species) {
            var sightings = species.sightings;
            for (var i = 0, len = sightings.length; i < len; i++) {
                sightings[i].marker.setAnimation(null);
            }
        };
    };
    
    app.customIcons = {
        'unknown': 'images/blank.png',
        'plants': 'images/plant.png',
        'plants-s': 'images/splant.png',
        'animals': 'images/animal.png',
        'animals-s': 'images/sanimal.png',
        'flowering plants': 'images/flower.png',
        'flowering plants-s': 'images/sflower.png',
        'insects': 'images/insect.png',
        'insects-s': 'images/sinsect.png',
        'butterflies and moths': 'images/butterfly.png',
        'butterflies and moths-s': 'images/sbutterfly.png',
        'birds': 'images/bird.png',
        'birds-s': 'images/sbird.png',
        'newUserMarker': 'images/sblank.png'
    };

    app.gMap = {
        mapOptions: {
            center: { lat: -33.844, lng: 151.112 },
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        },

        // markers: {},

        // currentMarker: '',

        // setCurrentMarker: function (markerName) {
        //     var marker = this.markers[this.currentMarker];
        //     if (markerName === '' || markerName === this.currentMarker) {
        //         // Clear the current marker (empty || toggled)
        //         app.wpEnhancedAvailable ?
        //             marker.setIcon('images/' + marker.getIcon().substr(8)) : null;
        //         this.currentMarker = '';
        //         this.map.panTo(this.mapOptions.center);
        //         this.map.setZoom(this.mapOptions.zoom);
        //         app.viewModel.currentSighting('');
        //     } else {
        //         // turn off current marker
        //         if (this.currentMarker && app.wpEnhancedAvailable) {
        //             marker.setIcon('images/' + marker.getIcon().substr(8));
        //         }
        //         // set a new current marker
        //         marker = this.markers[markerName];
        //         this.currentMarker = markerName;
        //         app.wpEnhancedAvailable ?
        //             marker.setIcon('images/s' + marker.getIcon().substr(7)) : null;
        //         app.viewModel.currentSighting(markerName);
        //     }
        // },

        // reCenterToMarker: function (latlng) {
        //     // var marker = this.markers[markerName];
        //     this.map.panTo(latlng);
        // },

        // markerHighlight: function (markerName) {
        //     var marker = this.markers[markerName];
        //     // Toggle bounce animation
        //     if (marker.getAnimation() != null) {
        //         marker.setAnimation(null);
        //     } else {
        //         marker.setAnimation(google.maps.Animation.BOUNCE);
        //     }
        // },



        infowindow: new google.maps.InfoWindow({ content: '' }),

        toggleInfoWindow: function (species, marker) {
            var iw = this.infowindow;
            var currentContent = iw.getContent();
            var newContent = app.species[species].wm.iwHTML;
            // let the user toggle the InfoWindow
            if (currentContent !== newContent) {
                // there is only one infowindow, so set content with each click
                iw.setContent(newContent);
                iw.open(this.map, marker);
            } else if (currentContent === newContent &&
                app.currentMarker.marker === marker) {
                // clear content with close to enable toggle logic
                iw.setContent('');
                iw.close();
            } else {
                // moving same content to a new marker
                iw.close();
                iw.open(this.map, marker);
            }
        },

        // markerClicked: function (species, marker) {
        //     if (app.wpEnhancedAvailable) {
        //         this.toggleInfoWindow(species, marker);
        //     } else {
        //         this.reCenterToMarker(marker.position);
        //     }
        //     // this.setCurrentMarker(species);
        // },

        // renderMarker: function (isVisible, species, location) {
        //     if (isVisible) {
        //         var customMarker = null;
        //         // If Wikipedia data available,
        //         // Use a custom marker based on taxonomy 
        //         if (app.wpEnhancedAvailable) {
        //             var taxon = app.data.wikipedia[species].taxon;
        //             // assign a classification by first lowest found
        //             // (least likely to most likely)
        //             customMarker = this.appMarkers[(taxon.order ||
        //                 taxon.class || taxon.division || taxon.kingdom)];
        //         }
        //         this.markers[species] = new google.maps.Marker({
        //             position: location,
        //             icon: customMarker,
        //             title: species,
        //             map: this.map
        //         });
        //         // Add an click event listener to the marker
        //         google.maps.event.addListener(this.markers[species], 'click', function (e) {
        //             this.markerClicked(species);
        //         }.bind(this));
        //     } else {
        //         this.markers[species].setMap(null);
        //     }
        // },
        
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
                        
            app.data.basic.push({
                'name': name,
                'lat': location.A,
                'lng': location.F
            });
            
            var addit = function () {
                var s = app.data.basic;
                var l = s.length - 1;
                var nw = s[l];
                app.viewModel.sightings().push(
                    new app.SpeciesModel(nw.name, nw.lat, nw.lng, '')
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
        app.viewModel.flickrPhotos(null);
        app.currentMarker.deselect(true);
        app.currentMarker = '';
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
    app.viewModel = new app.ViewModel(app.species);
    ko.applyBindings(app.viewModel);
};