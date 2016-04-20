/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed object
         * in the allFeeds array and ensures it has a URL defined
         * and that the URL is not empty.
         */
        var length= allFeeds.length;
        it('Each object in the allFeeds array has a URL defined', function() {
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].url).toEqual(jasmine.any(String));
            }
        });

        it('and that URL is not empty', function() {
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });

        /* This is a test that loops through each feed object
         * in the allFeeds array and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Each object in the allFeeds array has a name defined', function() {
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].name).toEqual(jasmine.any(String));
            }
        });

        it('and that name is not empty', function() {
            for (var i = 0; i < length; i++) {
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
    });

    /* This is a new test suite named "The menu" */
    describe('The menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default. We are doing this by
         * checking whether the body element has
         * "menu-hidden" class.
         * https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-has-a-particular-class/
         */
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        var menuIcon=$('.menu-icon-link');
        it('menu changes visibility when icon clicked', function() {

            //click to open menu, class disappears
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            //click to close menu, class reappears
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This is a new test suite named "Initial Entries" */
    describe ('Initial Entries', function(){
        /* This is a test that checks that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        //Using the done() callback to ensure async function finishes before the spec is checked
        //this discussion was very helpful:
        //https://discussions.udacity.com/t/when-does-it-require-done/38785
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('there is at least one .entry element in the .feed container', function(){
            var numItems = $('.feed .entry').length;
            expect(numItems).toBeGreaterThan(0);
        });
    });

    /* This is a new test suite named "New Feed Selection" */
    describe ('New Feed Selection', function(){
        /* This is a test that ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feedHeading, newHeading;

        //load feed, set initial feedHeading, load another feed, set newHeading, signal completion
        beforeEach(function(done){
            loadFeed(1, function(){
                feedHeading=$('.entry h2').html();
                //console.log ('feedHeading= ' + feedHeading);
                loadFeed(2, function(){
                    newHeading=$('.entry h2').html();
                    //console.log ('newHeading= ' + newHeading);
                    done();
                });
            });
        });

        it("content changes when new feed is loaded", function() {
            expect(feedHeading).toBeDefined();
            expect(newHeading).toBeDefined();
            expect(feedHeading).not.toEqual(newHeading);
        });
    });
}());
