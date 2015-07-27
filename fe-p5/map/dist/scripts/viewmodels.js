!function(){"use strict";app.gMapVM={mapOptions:{center:{lat:-33.844,lng:151.112},zoom:17,mapTypeId:google.maps.MapTypeId.TERRAIN,disableDefaultUI:!0},infowindow:new google.maps.InfoWindow({content:""}),toggleInfoWindow:function(i,n){var t=this.infowindow.getContent(),e=app.data.species[i].wm?app.data.species[i].wm.iwHTML:i;t!==e?(this.infowindow.setContent(e),this.infowindow.open(this.map,n)):t===e&&app.currentSighting.marker===n?($("#add-new").fadeIn(),this.infowindow.setContent(""),this.infowindow.close()):(this.infowindow.close(),this.infowindow.open(this.map,n))},map:null,newEntryInfoWindow:null,newEntryMarker:null,lastEntryMarker:null};var i=function(){$("#add-new").fadeIn(),app.gMapVM.infowindow.setContent(""),app.koViewModel.photos(null),app.currentSighting.deselect(!0),app.currentSighting=""};google.maps.event.addListener(app.gMapVM.infowindow,"closeclick",i);var n=function(){app.gMapVM.map=new google.maps.Map(document.getElementById("map-canvas"),app.gMapVM.mapOptions)};google.maps.event.addDomListener(window,"load",n);var t=function(i){this.binomial=i.binomial,this.keywords=i.keywords.toLowerCase(),this.commonNames=i.wm?"Also known as: "+i.wm.commonNames.join(", ")+".":"",this.taxon=function(){if(i.wm){var n=[],t=i.wm.taxon;for(var e in t)n.push(e+": "+t[e]);return n.join(" | ")}return""}.bind(this)(),this.isVisible=ko.observable(!1),this.sightings=i.sightings,this.drawMapMarker=function(){var i;i=this.isVisible()?app.gMapVM.map:null;for(var n=0,t=this.sightings.length;t>n;n++)this.sightings[n].marker.setMap(i)}},e=function(i){this.filterStr=ko.observable(""),this.tempFilterStr="",this.speciesNames=[],this.photos=ko.observableArray(),this.allSpecies=ko.observableArray(function(){var n=i.species,e=[];for(var s in n)e.push(new t(n[s])),this.speciesNames.push(n[s].binomial);return e}.bind(this)()),this.filteredSpecies=ko.computed(function(){return this.allSpecies().filter(function(i){return i.isVisible(i.keywords.indexOf(this.filterStr().toLowerCase())>=0),i.isVisible()}.bind(this))}.bind(this)),this.listClick=function(i){this.filterStr()===i.binomial?this.filterStr(this.tempFilterStr):(this.tempFilterStr=this.filterStr(),this.filterStr(i.binomial))}.bind(this),this.mapMarkerBounce=function(i){for(var n=i.sightings,t=0,e=n.length;e>t;t++)n[t].marker.setAnimation(google.maps.Animation.BOUNCE)},this.mapMarkerPuncture=function(i){for(var n=i.sightings,t=0,e=n.length;e>t;t++)n[t].marker.setAnimation(null)},this.addNewSpecies=function(n){this.allSpecies().push(new t(i.species[n])),this.speciesNames.push(n)}.bind(this)};window.onload=function(){app.koViewModel=new e(app.data),ko.applyBindings(app.koViewModel)}}();