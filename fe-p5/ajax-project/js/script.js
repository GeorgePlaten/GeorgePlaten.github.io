/// <reference path="../../../typings/jquery/jquery.d.ts"/>

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street');
    var $city = $('#city');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    
    var locationString = $street.val() + ", " + $city.val();
    var gSVIstring = "https://maps.googleapis.com/maps/api/streetview";
    var gSVIsize = "?size=600x400";
    var gSVIlocation = "&location=" + locationString;
    var gSVIparams = gSVIsize + gSVIlocation;
    gSVIstring += gSVIparams;


    $body.append($(document.createElement('img'))
        .attr('src', gSVIstring)
        .addClass('bgimg'));
        
	//    NYT
	var nytQuery = {
		baseUrl: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?',
		query: 'q=' + $city.val(),
		options: '&page=2',
		apiKey: '&api-key=' + 'apikeys.NEWYORKTIMES'
	};

	var nytQueryString = function () {
		var text = "";
		for (var i in nytQuery) {
			text += nytQuery[i];
		}
		return text;
	}();

	var wrangleNYTData = function (data) {
		$nytHeaderElem.text('New York Times Articles');
		for (var i = 0, articles = data.response.docs; i < articles.length; i++) {
			if (articles[i].snippet) {
				$nytElem.append($('<li></li>')
					.append('<h3><a href="' + articles[i].web_url +
					'">' + articles[i].headline.main + '</a></h3>')
					.append('<p>' + articles[i].snippet + '</p>')
					);
			}
		}
	};

	var nytFail = function () {
		$nytHeaderElem.text("Failed to load JSON from New York Times");
	};

	$.getJSON(nytQueryString, wrangleNYTData).error(nytFail);
	
//    WikiPedia
	var wikipQuery = {
		baseUrl: 'http://en.wikipedia.org/w/api.php?',
		query: 'action=query&generator=allpages&gaplimit=5&gapfrom=' + $city.val(),
//		options: '&page=2',
		content: '&prop=info&inprop=url',
		format: '&format=json'
	};
	
	var getWikiUrl = function () {
		var text = "";
		for (var i in wikipQuery) {
			text += wikipQuery[i];
		}
		return text;
	}();

	var wrangleWPData = function (data) {
		var pages = data.query.pages;
		for (var page in pages) {
			$wikiElem.append('<li><a href="' + pages[page].fullurl 
			+ '">' + pages[page].title + '</a></li>');
		}
	};
		
	$.ajax({
		url: getWikiUrl,
	    dataType: 'jsonp',
		success: wrangleWPData
	});

    return false;
};

$('body').append($(document.createElement('img')).attr('src', 'cat.jpg').addClass('bgimg'));
$('#form-container').submit(loadData);
