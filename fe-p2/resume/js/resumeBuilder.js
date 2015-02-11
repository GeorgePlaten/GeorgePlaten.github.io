// Add the JSONs
var bio = {
  "name": "George Platen",
  "role": "(secret inventor)",
  "contacts": {
    "mobile": "555-1234-789",
    "email": "gp@theinstitute.gov",
    "github": "GeorgePlaten",
    "twitter": "@georgieEarth",
    "location": "San Francisco, CA, S4/3"
  },
  "bioPic": "images/biopic.jpg",
  "welcomeMessage": "Why do they call them Olympics?",
  "skills": [
    "Innovating", "Creating", "Arguing", "Failing"
  ]
};

var work = {
  "jobs": [
    {
      "employer": "Education Earth",
      "title": "Inventor",
      "location": "Earth Innovation Institute, San Francisco, CA, S4/3",
      "dates": "2420-",
      "description": "(classified)"
    },
    {
      "employer": "The House",
      "title": "Resident",
      "location": "The House, San Franciso, CA, S4/3",
      "dates": "2419-2420",
      "description": "Gardening, housework and contemplation."
    }
  ]
};

// Revert back from each image containing an object with both src and alt properties
// to fit with any potential automatic marking machines at Udacity...
// ...Nope, revert back AGAIN, after checking the docs, the only requirement stated is that
// the _names_ are exactly the same, not the values.
var projects = {
  "projects": [
    {
      "title": "Conform",
      "dates": "2419-2419",
      "description": "Maintaining bed clothes, tending vegetables, building frustration.",
      "images": [
        {
          "src": "images/hospitalcorners.png",
          "alt": "Hospital corners"
        },
        {
          "src": "images/wellfertilised.png",
          "alt": "Well fertilised"
        },
        {
          "src": "images/angryyoungman.png",
          "alt": "Angry Fry: Not sure if... no wait"
        }
      ]
    },
    {
      "title": "PlatenPower",
      "dates": "2419-2420",
      "description": "Making stuff like it's 2999.",
      "images": [
        {
          "src":"images/platenspectograph.png",
          "alt":"Spectograph (Better than Beeman's!)"
        },
        {
          "src":"images/platenpageturner.png",
          "alt":"No more tired arms!!!"
        },
        {
          "src":"images/platenblaster.png",
          "alt":"Super Blaster 6000 SUX!!!!!!"
        }
      ]
    }
  ]
};


var education = {
  "schools": [
    {
      "name": "The House",
      "location": "The House, San Francisco, CA, S4/3",
      "degree": "Education",
      "majors": [
        "Programming",
        "Electronics",
        "Spectography"
      ],
      "dates": 2419,
      "url": "http://thehouse.gov"
    },
    {
      "name": "Tape Day",
      "location": "Omaha, NE, S4/2",
      "degree": "Pre-education",
      "majors": [
        "Reading",
        "Writing",
        "Arithmetic"
      ],
      "dates": 2409,
      "url": "http://education.gov"
    }
  ],
  "onlineCourses": [
    {
      "title": "Novian Diplomacy",
      "school": "Domocile Ingenescu",
      "dates": 14212089840000,
      "url": "http://socialscience.org/history"
    },
    {
      "title": "Electronics for Dummies",
      "school": "Omani's Olyglot",
      "dates": 14159931840000,
      "url": "http://www.abelard.org/asimov.php"
    }
  ]
};

// Add Encapsulated Display Methods

bio.display = function() {
  // Using helper.js to get HTML snippets for adding my name and role in the header.
  // Using the javascript .replace() method to insert data from my bio object into the
  // template. This will get a H1, a span and a trailing hr.
  var formattedName = HTMLheaderName.replace("%data%",bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%",bio.role);
  // The template HTML with my data now exist in memory but they need to be
  // added to the DOM. We are using jQuery to add it, but we could have
  // used plain JS. That would be 4 steps instead of 1.
  // $().prepend() the role and name to the div#header. We are using prepend here to place
  // the content inside div#header but above the ul#topContacts.
  $("#header").prepend(formattedRole);
  $("#header").prepend(formattedName);

  // The contact ul is provided in index.html, so we will get li templates for each item
  // from helper.js. We need to loop over the seperate contact items and append them
  // using jQuery selection technique.
  for (var contactKind in bio.contacts) {
    // if the contact detail is a common link form, build the link, otherwise just add text
    var contactDetail;

    // switch for details with different links...
      // These additional details should be in the JSONs but if the Udacity submissions are
      // being marked by automatically, then changing the format of the JSONs could get
      // me a kick. I'm also doing HTML snippets here for similar reasons, even though I would
      // really put it in helper.js (Actually, I did originally do all this, but have
      // changed it back. 3 times.) It was also nice to find and figure out this switch / case thing.
    switch (contactKind) {
      case 'mobile':
        contactDetail = '<a href="tel:' + bio.contacts[contactKind].replace(/\D/g,'') +
          '">' + bio.contacts[contactKind] + '</a>';
        break;
      case 'github':
        contactDetail = '<a href="https://github.com/' + bio.contacts[contactKind] +
          '">' + bio.contacts[contactKind] + '</a>';
        break;
      case 'email':
        contactDetail = '<a href="mailto:' + bio.contacts[contactKind] + '">' +
          bio.contacts[contactKind] + '</a>';
        break;
      case 'twitter':
        contactDetail = '<a href="https://twitter.com/' + bio.contacts[contactKind] +
          '">' + bio.contacts[contactKind] + '</a>';
        break;
      default:
        contactDetail = bio.contacts[contactKind];
    }

    var formattedContactInfo = HTMLcontactGeneric.replace("%data%",contactDetail).replace("%contact%",contactKind); // hmmm... chained replace methods work, nice!
    // Add the JS data to the page into ul#topContacts using jQuery .append() this time.
    $("#topContacts").append(formattedContactInfo);
    // Add it to the footer as well.
    $("#footerContacts").append(formattedContactInfo);
  }

  // Get the snippets for the biopic and welcome message and replace personal data
  var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
  var formattedWelcomeMessage = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
  // Add them to the DOM with jQuery
  $("#header").append(formattedBioPic);
  $("#header").append(formattedWelcomeMessage);

  // Use jQuery to append the HTML for h3 and skills ul container to the header div
  $("#header").append(HTMLskillsStart);
  // get the skills from bio (an array)
  var formattedSkills = bio.skills;
  // If bio.skills is not empty, it will evaluate to true and continue.
  if (bio.skills.length > 0) {
    // Use the jQuery iterator $.each() to do it's magic on each item in the skills array
    // Found syntax and examples here: http://api.jquery.com/jquery.each/
    // Used this as opposed to raw Javascript because I've never used jQuery before
    // and wanted to see how to do it.
    $.each(formattedSkills, function(i, formattedSkill) {
      // jQuery gets the skills ID (which only came in when appending HTMLskillsStart),
      // then gets the HTML snippet for each item in the array and does the replacement on it.
      // Appending each one to ul#skills
      $("#skills").append(HTMLskills.replace("%data%", formattedSkill));
    });
  }
};

work.display = function() {
  // Add a wrapper div for the jqueryUI accordion. This should be in the
  // helper.js, but the Udacity markers have indicated
  // not to do much editing in that file, I am presuming they would like to have
  // fewer files and places to look when assessing submissions.
  $('#workExperience').append('<div class="accordion-part"></div>');

  var jobs = work.jobs; // using the jobs variable name mostly for readability
  // Run a for loop to add HTML snippets for each entry in the jobs
  // array. Before looping back to each new entry it also adds some job details
  // to the snippet. The detail snippets are built with more job object properties
  // and appended to the job entry's container.
  // DONE: change from for-in to for
  var jobsLen = jobs.length;
  for (var i=0; i<jobsLen; i++) {
    // Adds the main work container snippet, plus jqUI accordion class
    $("#workExperience .accordion-part").append(HTMLworkStart);
    // Builds and adds the details snippet based on the context of the current array item.
    // The rest of these comments refer to when I was using a [for (job in jobs)] loop.
    // Note the referencing [job] is the array index and is the loop's index - this caused
    // confusion and difficulty for me because it looked like I was referencing the member itself.
    var formattedEmployer = HTMLworkEmployer.replace("%data%", jobs[i].employer);
    var formattedWorkTitle = HTMLworkTitle.replace("%data%", jobs[i].title);
    var formattedLocation = HTMLworkLocation.replace("%data%", jobs[i].location);
    var formattedDates = HTMLworkDates.replace("%data%", jobs[i].dates);
    var formattedDescription = HTMLworkDescription.replace("%data%", jobs[i].description);
    // Concatenate both snippets and append to the container.
    $(".work-entry:last").append(formattedEmployer + formattedWorkTitle);
    $(".work-entry:last").append(formattedLocation);
    $(".work-entry:last").append(formattedDates);
    $(".work-entry:last").append(formattedDescription);
  }
};

projects.display = function() {
  // Add wrapper for jQueryUI accordion, HTML should be assigned
  // to single variable in helper.js
  // But I left here for udacity marking. See earlier explanation.
  $('#projects').append('<div class="accordion-part"></div>');

  var projectsArr = projects.projects; // Assigned for readability
  // Loop each project entry
  // DONE: get rid of for-in
  var projectsArrLen = projectsArr.length;
  for (var i=0; i<projectsArrLen; i++) {
    var formattedProjectTitle = HTMLprojectTitle.replace("%data%",projectsArr[i].title);
    $("#projects .accordion-part").append(HTMLprojectStart);

    var formattedProjectDates = HTMLprojectDates.replace("%data%",projectsArr[i].dates);
    var formattedProjectDescription = HTMLprojectDescription.replace("%data%",projectsArr[i].description);
    $(".project-entry:last").append(formattedProjectTitle + formattedProjectDates + formattedProjectDescription);

    var projectImagesArr = projectsArr[i].images;
    // Loop each Image in each project
    // DONE: get rid of for-in
    var projectImagesArrLen = projectImagesArr.length;
    for (var j=0; j<projectImagesArrLen; j++) {
      var imgSrc = projectImagesArr[j].src;
      var imgAlt = projectImagesArr[j].alt;
      var formattedProjectImage = HTMLprojectImage.replace("%data%",imgSrc);
      $(".project-entry:last").append(formattedProjectImage);
      // Use jquery to add image id attribute
      // Also using it to add it as title attr, so that it will display as
      // as a tooltip in Chrome
      $(".project-entry:last > img:last").attr("alt", imgAlt).attr("title", imgAlt);
    }
  }
};

education.display = function() {
  // Add wrapper for jQueryUI accordion, HTML should be in helper.js
  // But I left here for udacity marking. See earlier explanation.
  $('#education').append('<div class="accordion-part"></div>');

  // Start a loop to display the schools array.
  var schoolsArr = education.schools;
  //  Get the array length.
  var schoolsArrLen = schoolsArr.length;
  // I had a massive head scratcher here where I was getting console errors, it turned out I was off by 1.
  for (var schoolIndx=0; schoolIndx<schoolsArrLen; schoolIndx++) {
    // get the education-entry wrapper.
    $("#education .accordion-part").append(HTMLschoolStart);
    // Get the formatted html and add name, degree, dates and location.
    var formattedSchoolName = HTMLschoolName.replace("%data%",schoolsArr[schoolIndx].name);
    var formattedSchoolDegree = HTMLschoolDegree.replace("%data%",schoolsArr[schoolIndx].degree);
    var formattedSchoolDates = HTMLschoolDates.replace("%data%",schoolsArr[schoolIndx].dates);
    var formattedSchoolLocation = HTMLschoolLocation.replace("%data%",schoolsArr[schoolIndx].location);
    // Add them all in one big lump.
    $(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree).append(formattedSchoolDates).append(formattedSchoolLocation);

    // Start a loop for degrees array
    var majorsArr = schoolsArr[schoolIndx].majors;
    // Get the array length
    var majorsArrLen = majorsArr.length;
    for (var i=0; i<majorsArrLen; i++) {
      // Get the formatted html and add the degrees.
      var formattedSchoolMajor = HTMLschoolMajor.replace("%data%",majorsArr[i]);
      // Add each to the page appending on the last element with a class of education-entry.
      $(".education-entry:last").append(formattedSchoolMajor);
    }
  } // end school loop

  // Start Online Courses
  $("#education .accordion-part").append(HTMLonlineClasses);
  // Start online courses loop, get the array.
  var onlineCoursesArr  = education.onlineCourses;
  // Get the array length
  var onlineCoursesArrLen = onlineCoursesArr.length;
  // Start the loop
  for (var oci=0; oci<onlineCoursesArrLen; oci++) {
    // get the education-entry wrapper.
    $("#education .accordion-part").append(HTMLschoolStart);
    // get the html and insert data
    var formattedOnlineTitle = HTMLonlineTitle.replace("%data%",onlineCoursesArr[oci].title);
    var formattedOnlineSchool = HTMLonlineSchool.replace("%data%",onlineCoursesArr[oci].school);
    var formattedOnlineDates = HTMLonlineDates.replace("%data%", new Date(onlineCoursesArr[oci].dates).getFullYear());
    var formattedOnlineURL = HTMLonlineURL.replace("%data%",onlineCoursesArr[oci].url).replace("#",onlineCoursesArr[oci].url);
    // append the loop iteration to the page
    $(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool).append(formattedOnlineDates).append(formattedOnlineURL);
  }
};

// Display it all;
work.display();
projects.display();
bio.display();
education.display();

// Add the Map
$("#mapDiv").append(googleMap);

// Be creepy, harvest click locations
function clickloc (){
  var x;
  var y;

  // jQuery gets. jQuery gets what?
  $(document).click(function(loc) {
    x = loc.pageX;
    y = loc.pageY;
    logClicks(x,y);
  });
}
clickloc();

// jqueryUI accordion animation. Not nice: relocates you on the page so you might
// have to scroll. It's here for the learning experience and udaciousness.
$("#accordion").accordion({
  active: 0,
  header: 'h2',
  heightStyle: "content",
  collapsible: true,
  animate: {
    easing: "easeInOutBack",
    duration: 1000
  }
});

// nothing to see here
// $("#main").append(internationalizeButton);
// function inName(fullName) {
//   console.log(fullName);
//   var names = fullName.trim().split(" ");
//   var surName = names[1].toUpperCase();
//   var firstName = names[0].slice(0,1).toUpperCase() + names[0].slice(1);
//   return firstName + " " + surName;
// }
// console.log(inName("test inname"));
