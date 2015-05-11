## Website Performance Optimization portfolio project

This is my second run-through of this project, the first was done very
manually and as part of a progressive learning experience. I decided
I would like to redo the project from the start while applying the tools
and techniques I have learned on the first run-through.

In particular, I discovered the concept of using build tools and from 
there I found Google's [Web Starter Kit](https://developers.google.com/web/starter-kit/)
(WSK), which I have decided to use this time.


### Getting started
Steps taken to get started:

1. Clone the WSK repository
2. Clone the project repository into WSK.
3. Refactor project code to work with WSK file and directory structure.
4. Remove unwanted and unneeded utilities from WSK.
5. Edit and test gulpfile.js to serve and build/serve 

###Part 1: Optimize PageSpeed Insights (PSI) score for index.html
Steps taken to achieve PSI scores of 90+:

<ol>
  <li>Refactor project to be built with WSK for automatic Code Minification 
  and Image Optimization.<br>
  <em>From: Mobile/Dektop 60/67 To: 61/68 <strong>Change: 
  +1/+1</strong></em></li>
  <li>Optimize Images
    <ol>
      <li>profile.jpg: replace file with optimized version as provided by
      PSI</li>
      <li>pizzeria.jpg:  hoist the optimized copy provided by PSI to the 
      root images directory, further resize the image to allow it be served 
      at natural dimensions.</li>
      <li>Content section thumbnails: use local copies and fix CSS to serve 
      images at natural dimensions.</li>
      <li>All images: add height and width attributes</li>
    </ol>
    <em>From: Mobile/Dektop 61/68 To: 76/89 <strong>Change: 
    +15/+21</strong></em>
  </li>
  <li>Eliminate render-blocking JavaScript and CSS in above-the-fold 
  content:
    <ol>
      <li>Add media attribute to print stylesheet, to allow it to load 
      asychronously.</li>
      <li>Inline the webfonts in the CSS file.</li>
      <li>Inline the CSS (minified) in the HTML</li>
      <li>Inline perfmatters.js (minified) in the HTML, before CSS to ensure it 
      is not render blocking. This JavaScript could be loaded asynchronously
      but it is small enough to be inlined in the head.</li>
      <li>Remove Google Analytics scripts. Again they could be async'd, if they
      were needed.</li>
      <li>Remove unneccessary meta tags from head.</li>
    </ol>
  </li>
  <em>From: Mobile/Dektop 76/89 To: 95/96 <strong>Change: +19/+7</strong></em>  
</ol>




###Part 2: Optimize Frames per Second in pizza.html

1. Image optimization
  1. Replace pizzeria.jpg with PSI optimized resource
  2. Downsample pizza.png to 35 color palette (10kb)
  3. Create smaller version of pizza.png for the backgroung without
  transparency and to be served at natural size.
2. Optimize HTML, CSS and JavaScript with WSK and gulp
  1. Use uglify for JavaScript
  2. Use csso to optimize and minify CSS 
  3. Use minify-html to minify pizza.html
3. Eliminate render-blocking JavaScript and CSS in above-the-fold content
  1. Use uncss to remove unused styles from bootstrap-grid.css
  2. Inline all CSS into head of pizza.html
  3. Add device-with content meta tag to assist consistent layout
4. <strong>main.js</strong>: Fix Layout Thrashing caused by updatePositions()
  1. Hoist <code>phase</code> invariant from for loop.
  2. Hoist <code>items = document.querySelectorAll('.mover')</code> query 
  from function scope to global scope so it is not called with each scroll
  event. Rename <code>items</code> to <code>movingPizzas</code> as it need to 
  make more sense in global context. <code>movingPizzas</code> is then set 
  during the <code>DOMContentLoaded</code> event after all the pizzas are 
  added.
  3. Remove <code>document.body.scrollTop</code> layout tiggering query
  to new intermediate calling <code>scroller()</code> function and pass it as 
  parameter <code>shift</code>.
  4. Make <code>shift</code> a global variable with default value of 5
  to prevent layout thrashing on first page load.
5. <strong>main.js</strong>: Improve painting performance while scrolling
  1. Dynamically set the number of background pizzas based on screen size
  during <code>DOMContentLoaded</code> event, as painting performance scales
  with element quantity. Used maximum screen size to save having to recalculate
  with each window resize. 
  2. Add <code>backface-visibility: hidden</code> hack to CSS for mover class, 
  and <code>will-change: transform</code> hint for browsers that can use it.
6. <strong>main.js</strong>: Hoist invariant from Random Pizza generator loop
7. <strong>main.js</strong>: Optimize resizePizzas function
  1. Hoist invariants from functions from changePizzaSizes.
  2. Change determineDx function to return simple percentage value and
  assignment for use in changePizzaSizes.
  3. Use a style change to change all pizzas at once instead of looping one
  by one.

<em>PageSpeed Results: Mobile/Dektop <strong>96/98</strong></em>  
