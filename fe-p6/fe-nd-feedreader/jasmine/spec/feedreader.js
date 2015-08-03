/// <reference path="../../../../typings/jasmine/jasmine.d.ts"/>

/* @fileoverview feedreader.js: All of the jasmine tests that
 * will be run against app.js
 */

/**
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

  /** Test the allFeeds variable in app.js */
  describe('RSS Feeds', function () {

    /**
     * Test 01
     * Make sure that the allFeeds variable has been defined and
     * and that it is not empty
     */
    it('are defined and have at least one item.', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /** 
     * Loop through each feed in the allFeeds array and test
     * the both the url and the name properties.
     * Set up single variables to report tests, we don't want
     * a message for each feed that is looped over
     */
    var aFeedHasABadUrl = false
      , aFeedHasABadName = false
      , len = allFeeds.length;

    for (var i = 0; i < len; i++) {
      /** 
       * Ensure each has a `url` key and its value is not empty
       * Taking care to check the property before the value
       * Test for both conditions and convert them to Booleans
       */
      if (!(allFeeds[i].url) || !(allFeeds[i].url.length)) {

        /** Only change to true here (can't be changed back) */
        aFeedHasABadUrl = true;
      }
           
      /** Same treatment for the `name` keys and values as `url` */
      if (!(allFeeds[i].name) || !(allFeeds[i].name.length)) {
        aFeedHasABadName = true;
      }
    }

    /** Test 02 - url is defined and not empty */
    it('each have a `url` string that isn\'t empty', function () {
      expect(aFeedHasABadUrl).toBe(false);
    });

    /** Test 03 - name is defined and not empty */
    it('each have a `name` string that isn\'t empty', function () {
      expect(aFeedHasABadName).toBe(false);
    });

  });


  /* TODO: (10) Write a new test suite named "The menu" */
  describe('The Menu', function () {
    
  });

  /* TODO: (11) Write a test that ensures the menu element is
   * hidden by default. You'll have to analyze the HTML and
   * the CSS to determine how we're performing the
   * hiding/showing of the menu element.
   */

  /* TODO: (12) Write a test that ensures the menu changes
   * visibility when the menu icon is clicked. This test
   * should have two expectations: does the menu display when
   * clicked and does it hide when clicked again.
   */

  /* TODO: (13) Write a new test suite named "Initial Entries" */

  /* TODO: (14) Write a test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test wil require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */

  /* TODO: (15) Write a new test suite named "New Feed Selection"

      /* TODO: (16) Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
} (jQuery));
