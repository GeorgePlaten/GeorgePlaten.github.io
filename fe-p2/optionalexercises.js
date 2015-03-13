// Relationships

function getRelationship(x, y) {
  var isNum = function(value) {
      return isNaN(value) ? false : Object.prototype.toString.call(value) === '[object Number]';
  };
  if (isNum(x) && isNum(y)) {
      return x>y ? ">" : x<y ? "<" : "=";
  }
  if (isNum(x) || isNum(y)) {
      return "Can't compare relationships because " + (isNum(y) ? x : y) + " is not a number";
  }
  return "Can't compare relationships because " + x + " and " + y + " are not numbers";
}

// If one or both of the values aren't numbers, your function
// should output:

// "Can't compare relationships because [this value] and [that
// value] [is]/[are] not [a] number[s]."

// where [this value] and [that value] are replaced with the
// non-numerical values. The sentence should be grammatically correct
// by outputting either is or are and pluralizing number if necessary.

// Try logging these functions to test your code!
console.log(getRelationship(1,4));
console.log(getRelationship(1,1));
console.log(getRelationship("that",2));
console.log(getRelationship("this"," something else"));
console.log(getRelationship(3));
console.log(getRelationship("hi"));
console.log(getRelationship(NaN));
console.log(getRelationship(NaN, undefined));

// Astronauts

// Twelve people have walked on the Moon. They are:
//
// Neil Armstrong
// Buzz Aldrin
// Pete Conrad
// Alan Bean
// Alan Shepard
// Edgar Mitchell
// David Scott
// James Irwin
// John W Young
// Charles Duke
// Eugene Cernan
// Harrison Schmitt
//
// You'll notice that these names are listed in the order that they first stepped
// on the Moon, not alphabetical order. To alphabetize them, it would make sense to
// write their names as lastname, firstname. For example: Neil Armstrong becomes
// Armstrong, Neil.
//
// Finish the alphabetizer(_names) function, which takes in a names
// array (of length N) containing strings of names and returns an alphabetized
// array of names in lastname, firstname format.

var moonWalkers = [
  "Neil Armstrong",
  "Buzz Aldrin",
  "Pete Conrad",
  "Alan Bean",
  "Alan Shepard",
  "Edgar Mitchell",
  "David Scott",
  "James Irwin",
  "John Young",
  "Charles Duke",
  "Eugene Cernan",
  "Harrison Schmitt"
];

function alphabetizer(names) {
    var namesLen = names.length;
    var surNameLastName = [];
    for (var i=0; i<namesLen; i++) {
        names[i] = names[i].split(" ");
        names[i][2] = names[i][1] + ", " + names[i][0];
        surNameLastName.push(names[i][2]);
    }
    return surNameLastName.sort();
}

// Try logging your results to test your code!
console.log(alphabetizer(moonWalkers));

// Page Insights

// Iterate through the localizedRuleNames in ruleResults and
// return an array of their strings.
function ruleList(results) {
  var myArr = [];
  var myResults = results.formattedResults.ruleResults;
  for (var group in myResults) {
      if (myResults[group].localizedRuleName.length > 0) {
          myArr.push(myResults[group].localizedRuleName);
      }
  }
  return myArr;
}

// Iterate through pageStats in the psiResults object and
// return the total number of bytes to load the website.
function totalBytes(results) {
    var total = 0;
    var stats = results.pageStats;
    for (var item in stats) {
        if (item.indexOf("Bytes") !== -1) {
            total = total + parseInt(stats[item],10);
        }
    }
    return total;
}

// Below, you'll find a sample PS Insights JSON
// and two console.log statements to help you test your code!

var psinsights = {
 "kind": "pagespeedonline#result",
 "id": "/speed/pagespeed",
 "responseCode": 200,
 "title": "PageSpeed Home",
 "score": 90,
 "pageStats": {
  "numberResources": 22,
  "numberHosts": 7,
  "totalRequestBytes": "2761",
  "numberStaticResources": 16,
  "htmlResponseBytes": "91981",
  "cssResponseBytes": "37728",
  "imageResponseBytes": "13909",
  "javascriptResponseBytes": "247214",
  "otherResponseBytes": "8804",
  "numberJsResources": 6,
  "numberCssResources": 2
 },
 "formattedResults": {
  "locale": "en_US",
  "ruleResults": {
    "AvoidBadRequests": {
      "localizedRuleName": "Avoid bad requests",
      "ruleImpact": 0.0
    },
    "MinifyJavaScript": {
      "localizedRuleName": "Minify JavaScript",
      "ruleImpact": 0.1417,
      "urlBlocks": [
      {
        "header": {
       "format": "Minifying the following JavaScript resources could reduce their size by $1 ($2% reduction).",
       "args": [
        {
         "type": "BYTES",
         "value": "1.3KiB"
        },
        {
         "type": "INT_LITERAL",
         "value": "0"
        }
       ]
        },
        "urls": [
        {
          "result": {
         "format": "Minifying $1 could save $2 ($3% reduction).",
         "args": [
          {
           "type": "URL",
           "value": "http://code.google.com/js/codesite_tail.pack.04102009.js"
          },
          {
           "type": "BYTES",
           "value": "717B"
          },
          {
           "type": "INT_LITERAL",
           "value": "1"
          }
         ]
        }
       },
       {
        "result": {
         "format": "Minifying $1 could save $2 ($3% reduction).",
         "args": [
          {
           "type": "URL",
           "value": "http://www.gmodules.com/ig/proxy?url\u003dhttp%3A%2F%2Fjqueryjs.googlecode.com%2Ffiles%2Fjquery-1.2.6.min.js"
          },
          {
           "type": "BYTES",
           "value": "258B"
          },
          {
           "type": "INT_LITERAL",
           "value": "0"
          }
         ]
        }
       }
      ]
     }
    ]
   },
   "SpriteImages": {
    "localizedRuleName": "Combine images into CSS sprites",
    "ruleImpact": 0.0
   }
  }
 },
 "version": {
  "major": 1,
  "minor": 11
 }
};

// Try logging the outputs below to test your code!
console.log(ruleList(psinsights));
console.log(totalBytes(psinsights));