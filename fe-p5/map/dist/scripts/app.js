var app=app||{};!function(){"use strict";app.currentSighting=null,app.apikeys={FLICKR:"e9648afe7558db322364fbe75507a46f",gmaps:""},app.images=[],app.saveNewSighting=function(){var e=$("#new-name")[0].value;e=e[0].toUpperCase()+e.slice(1).toLowerCase();var a=app.koViewModel.speciesNames.indexOf(e),p=app.gMapVM.newEntryMarker.getPosition(),n={name:e,lat:p.A,lng:p.F,date:new Date},i=function(){if(-1===a){if(app.koViewModel.addNewSpecies(e),app.gMapVM.lastEntryMarker=app.data.species[e].sightings[0].marker,void 0===app.data.species[e].wm||"unknown"===app.data.species[e].wm.taxon.kingdom)return alert("Homo sapiens"===e?e+" considered harmful.":"Unable to find that species on Wikipedia. \nIf you spelled it correctly, then my Wikiparser has let you down, sorry :("),app.koViewModel.allSpecies().pop(),void delete app.data.species[app.koViewModel.speciesNames.pop()]}else{var p=app.data.species[e].sightings[0].marker.icons.unselected,n=app.data.species[e].sightings.pop();n.marker.setIcon(p),app.data.species[e].sightings.push(n),app.gMapVM.lastEntryMarker=n.marker}$(".message").find("em").text(e),$(".undo-dialog").fadeIn(),setTimeout(function(){$(".undo-dialog").fadeOut("slow")},4e3),app.koViewModel.filterStr("//"),app.koViewModel.filterStr("")};-1===a?(app.data.addNewSpecies(n,i),app.data.addNewSighting(n)):app.data.addNewSighting(n,i),app.gMapVM.newEntryInfoWindow.setContent(""),app.gMapVM.newEntryMarker.setMap(null),$("#save-new").fadeOut(),$("#add-new").fadeIn("slow")},app.addNewSighting=function(){$("#add-new").fadeOut(),$("#save-new").fadeIn("slow"),app.currentSighting&&(app.currentSighting.deselect(),app.gMapVM.infowindow.close()),this.gMapVM.map.panTo(this.gMapVM.mapOptions.center),app.gMapVM.newEntryMarker=new google.maps.Marker({position:this.gMapVM.mapOptions.center,map:app.gMapVM.map,draggable:!0,icon:"images/sblank.png",title:"Drag me!"}),app.gMapVM.newEntryInfoWindow=new google.maps.InfoWindow,app.gMapVM.newEntryInfoWindow.setContent($(".new-sighting-info-window").html()),app.gMapVM.newEntryInfoWindow.open(this.gMapVM.map,app.gMapVM.newEntryMarker),google.maps.event.addListener(app.gMapVM.newEntryInfoWindow,"closeclick",function(){$("#save-new").fadeOut(),$("#add-new").fadeIn("slow"),app.gMapVM.newEntryInfoWindow.close(),app.gMapVM.newEntryMarker.setMap(null)}),$("#new-name").keyup(function(e){13===e.which&&app.saveNewSighting()})},app.undoLastEntry=function(){$(".undo-dialog").fadeOut(),app.gMapVM.lastEntryMarker.setMap(null),app.koViewModel.allSpecies().pop(),delete app.data.species[app.koViewModel.speciesNames.pop()]},setTimeout(function(){$("#map-canvas").find("h2").text()&&$("#map-canvas").find("h2").text("Unable to reach Google Maps, please try reloading the page")},8e3),$("#add-new").on({click:function(){app.addNewSighting()}}),$("#save-new").on({click:function(){app.saveNewSighting()}}),$("#message-button").on({click:function(){app.undoLastEntry()}}),Offline.on("confirmed-down",function(){$(".all-fail").show(),$(".wikipedia-ok").hide(),$(".wikipedia-fail").show(),$(".ajax-status").addClass("read-only"),$(".flickr-ok").hide(),$(".flickr-fail").show(),$("#add-new").prop("disabled",!0).removeClass("mdl-button--accent")}),Offline.on("confirmed-up",function(){$(".all-fail").hide(),$(".wikipedia-fail").hide(),$(".wikipedia-ok").show(),$(".ajax-status").removeClass("read-only"),$(".flickr-fail").hide(),$(".flickr-ok").show(),$("#add-new").prop("disabled",!1).addClass("mdl-button--accent")})}();