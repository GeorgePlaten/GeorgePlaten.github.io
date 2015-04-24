<h1>Website Performance Optimization portfolio project</h1>

<h2>Part 1: Optimize PageSpeed Insights score for index.html</h2>

<h3>Getting started process</h3>

<ol>
  <li>Copied the repository
  <li>Run python's SimpleHTTPServer.
  <li>Setup and run ngrok.<br>
  <li>Install the PageSpeed Insights extension for Chrome.
  <li>Analyze the page via ngrok in PageSpeed Insights web site.
</ol>

<h3>First run and observations</h3>
<p>The rating is already 89/100 for desktop and is 74/100 for mobile. Interestingly it reports that images are already optimized when it would appear from the slow progressive rendering that at least one of them is not.</p>

<h3>Optimizations as per PageSpeed reports</h3>
<ol>
  <li>M74, D89. <strong>Eliminate render blocking JavaScript and CSS above the fold.</strong> Note the listed script is an analytics script, so it is async'd. Add media attributes to the CSS links to inform the browser of criticality.
  <li>M77, D91 <strong>Optimize CSS delivery.</strong> Remove webfont to inlined CSS.
  <li>M87, D93 <strong>Optimize CSS delivery.</strong> Minify and inline main CSS.
  <li>M94, D97 <strong>Reduce Server Response, Leverage Browser Caching, Enable Compression.</strong> I have no control over these with SimpleHTTPServer/ngrok (at least I don't think I do), am hoping when I serve via github pages that they will already be nicely configured for me. <strong>Minify HTML.</strong> Use pagespeed extension to grab optimized HTML, also delete 'author' and 'description' meta tags.
  <li>M96, D97 <strong>Final ngrok score</strong> before server side optimizations.
  <li>M30, D30 <strong>Served page via github pages.</strong> Now the images are correctly marked as not optimized, download and replace optimized all resources as provided by PageSpeed Insights website (js, css and 2 images).
  <li>M96, D97 <strong>Final github pages score.</strong>
</ol>

<p>Post TODOs DONE: server-side optimizations (github pages provides gzipping, but not direct control over caching) and used build tools (node, gulp) to automate, minify and inline. See Part 3 below for more information.</p>


<h2>Part 2: Optimize Frames per Second in pizza.html</h2>

<p>To optimize views/pizza.html, I edited the main.js file with the following steps.</p>

<ol>
  <li>Change all querySelectors* to getElement*
  <li>Remove the initialization of variables from for loops.
  <li>Change the number of background moving pizza generated from 200 to 60
  <li>Optimize <code>changePizzaSizes()</code>
  <ol>
    <li>Create a new var <code>pizzas</code> to save creating an array with <code>document.getElementsByClassName("randomPizzaContainer")</code> for each loop iteration.
    <li>Removed other var initializations from the for loop (in Step 2) and modified them to use new <code>pizzas</code> array.
    <li>Use new var <code>len</code> from pizzas array to speed up the for loop.
  </ol>
  <li>Optimize <code>updatePositions()</code> by creating new vars <code>len</code>, <code>phase</code> and <code>shift</code> to save performing full document queries from inside the for loop or initializing new variables when reassignment is better.
</ol>

<h2>Part 3: Using Build Tools to optimize resources</h2>

<p>To minify the CSS, JavaScript and HTML files, I used <strong>gulp</strong> running on <strong>node</strong>. Gulp also allowed me to <em>inline</em> specific CSS files in the head of HTML during the build process. Most of the "Optimizations as per PageSpeed reports" as listed in Step 1 are now automated by gulp.</p>

<p>I decided against using build tools to optimize images, however, as image optimization is an 'art' (as also described in Ilya's web fundamentals documentation), and I have enough personal experience with image optimization to prepare the images in specialized applications.</p>
