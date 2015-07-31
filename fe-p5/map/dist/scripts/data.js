!function(){"use strict";app.data={species:{},basic:[{name:"Erithacus rubecula",lat:-33.844263,lng:151.113756,date:new Date("October 13, 2013")},{name:"Erithacus rubecula",lat:-33.843263,lng:151.111756,date:new Date("September 14, 2014")},{name:"Fuchsia magellanica",lat:-33.844548,lng:151.110811,date:new Date("October 1, 2015")},{name:"Polyommatus icarus",lat:-33.845096,lng:151.113337,date:new Date("September 13, 2014")},{name:"Geranium robertianum",lat:-33.844717,lng:151.110467,date:new Date("September 13, 2013")},{name:"Arenaria interpres",lat:-33.844948,lng:151.111011,date:new Date("January 1, 2012")},{name:"Marchantia polymorpha",lat:-33.845343,lng:151.110789,date:new Date("January 2, 2014")}],addNewSpecies:function(a,s){var n=new e(a),t=n.binomial;app.data.species[t]||(app.data.species[t]=n),s&&(p(t),r(t,s))},addNewSighting:function(a,e){var n=new s(a),t=n.name;app.data.species[t]&&app.data.species[t].sightings.push(n),e&&e()}};var a={unknown:"images/blank.png",plants:"images/plant.png","plants-s":"images/splant.png",fishes:"images/fish.png","fishes-s":"images/sfish.png",animals:"images/blank.png","animals-s":"images/sblank.png",mammals:"images/animal.png","mammals-s":"images/sanimal.png","flowering plants":"images/flower.png","flowering plants-s":"images/sflower.png",insects:"images/insect.png","insects-s":"images/sinsect.png","butterflies and moths":"images/butterfly.png","butterflies and moths-s":"images/sbutterfly.png",birds:"images/bird.png","birds-s":"images/sbird.png",carnivores:"images/carnivore.png","carnivores-s":"images/scarnivore.png",crustaceans:"images/crustacean.png","crustaceans-s":"images/scrustacean.png",rodents:"images/rodent.png","rodents-s":"images/srodent.png",newUserMarker:"images/sblank.png"};!function(){var e;for(var s in a)e=new Image,e.src=a[s],app.images.push(e);}();var e=function(a){this.binomial=a.name,this.keywords=a.name,this.sightings=[]};e.prototype.addKeyword=function(a){this.keywords+=", "+a.toLowerCase()};var s=function(e){this.name=e.name;var s={position:new google.maps.LatLng(e.lat,e.lng),title:e.name+", "+e.date.toDateString(),icon:a.unknown,icons:{selected:a.newUserMarker,unselected:a.unknown},map:null};this.marker=new google.maps.Marker(s),google.maps.event.addListener(this.marker,"click",this.selection.bind(this))};s.prototype.selection=function(){app.gMapVM.toggleInfoWindow(this.name,this.marker),app.currentSighting===this?this.deselect(!0):this.select()},s.prototype.deselect=function(a){app.currentSighting="",a&&app.gMapVM.map.panTo(app.gMapVM.mapOptions.center),this.marker.getIcon()&&this.marker.setIcon(this.marker.icons.unselected),app.koViewModel.photos(null),$(".photo-bar").addClass("display-none")},s.prototype.select=function(){$("#add-new").fadeOut(),app.currentSighting&&app.currentSighting.deselect(),app.currentSighting=this,this.marker.getIcon()&&this.marker.setIcon(this.marker.icons.selected),app.koViewModel.photos(app.data.species[this.name].pics),$(".photo-bar").removeClass("display-none")};var n=function(a,e){if(-1===a.indexOf(e))return'Property "'+e+'" not found';var s=a.substring(a.indexOf(e)+e.length).replace(/ /g,"");return s.substring(s.indexOf("=")+1,s.indexOf("\n"))},t=function(a){var e={};switch(n(a,"regnum")){case"[[Plant]]ae":switch(e.kingdom="plants",n(a,"unranked_divisio")){case"[[Angiosperms]]":e.division="flowering plants"}break;case"[[Animal]]ia":switch(e.kingdom="animals",n(a,"classis")){case"[[Insect]]a":switch(e["class"]="insects",n(a,"ordo")){case"[[Lepidoptera]]":e.order="butterflies and moths"}break;case"[[bird|Aves]]":case"[[Aves]]":e["class"]="birds";break;case"[[Malacostraca]]":e["class"]="crustaceans";break;case"[[Actinopterygii]]":e["class"]="fishes";break;case"[[Mammal]]ia":switch(e["class"]="mammals",n(a,"ordo")){case"[[Rodent]]ia":e.order="rodents";break;case"[[Carnivora]]":e.order="carnivores"}}break;default:e.kingdom="unknown"}return e},i=function(e){var s=e.query.pages,n=e.query.redirects||null,i=function(a){return a.replace(/<\/?b>/g,"").toLowerCase()};for(var r in s){if("-1"===r)return;var o=s[r].title;if(n)for(var p=0,c=n.length;c>p;p++)o===n[p].to&&(o=n[p].from);var l=s[r].revisions[0]["*"],d=s[r].extract,g=s[r].canonicalurl,m=$("<div>").append($("<h3>").text(o)).append($("<div>").html(d).addClass("extract")).append($("<p>").append($("<a>").attr("href",g).text("[Wikipedia]"))),u=t(l),h=d.match(/<b>(.*?)<\/b>/g).map(i),f=app.data.species[o];f.wm={iwHTML:m[0],url:g,taxon:u,commonNames:h};for(var w in u)f.addKeyword(u[w]);for(var k=0,b=h.length;b>k;k++)f.addKeyword(h[k]);for(var v,y=f.sightings,x=u.order||u["class"]||u.division||u.kingdom,M=0,C=y.length;C>M;M++)v=y[M].marker,v.icons.selected=a[x+"-s"],v.icons.unselected=a[x],v.setIcon(a[x])}},r=function(a,e){var s="https://en.wikipedia.org//w/api.php?action=query&format=json&redirects=&prop=revisions|extracts|info&rvprop=content&rvsection=0&exlimit=max&exintro=&excontinue=true&inprop=url",n=a?[a]:app.data.basic.map(function(a){return a.name}),t=n.join("|");$.ajax({url:s+"&titles="+t,dataType:"jsonp",success:function(a){$("#add-new").prop("disabled",!1).addClass("mdl-button--accent"),$(".wikipedia-fail").hide(),$(".wikipedia-ok").show(),$(".ajax-status").removeClass("read-only"),i(a),e&&e()},error:function(){$("#add-new").prop("disabled",!0).removeClass("mdl-button--accent"),$(".wikipedia-ok").hide(),$(".wikipedia-fail").show(),$(".ajax-status").addClass("read-only")}})},o=function(a){for(var e,s,n=a.photos.photo,t=[],i=0,r=n.length;r>i;i++){var o={};e=n[i],o.src=e.url_q,o.title=e.title||"untitled",o.url="https://www.flickr.com/photos/"+e.owner+"/"+e.id,t.push(o),s=new Image,s.src=e.url_q,app.images.push(s)}return t},p=function(a){var e="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+app.apikeys.FLICKR+"&safe_search=1&content_type=1&extras=url_q&per_page=6&page=1&format=json&nojsoncallback=1";$.ajax({url:e+"&text="+a,dataType:"json",success:function(e){$(".flickr-fail").hide(),$(".flickr-ok").show(),$(".ajax-status").removeClass("flickr-failed"),app.data.species[a]&&(app.data.species[a].pics=o(e))},error:function(){$(".flickr-ok").hide(),$(".flickr-fail").show(),$(".ajax-status").addClass("flickr-failed")}})},c=function(){for(var a=app.data.basic.map(function(a){return a.name}),e=0,s=a.length;s>e;e++)p(a[e])},l=function(){for(var a=app.data.basic,e=0,s=a.length;s>e;e++)app.data.addNewSpecies(a[e]),app.data.addNewSighting(a[e]);r(),c()};l()}();