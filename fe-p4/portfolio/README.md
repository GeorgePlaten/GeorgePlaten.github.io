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

1. Refactor project to be built with WSK for automatic Code Minification and
Image Optimization.
<br>_From: Mobile/Dektop 60/67 To: 61/68 **Change: +1/+1**_
2. Optimize Images
  1. profile.jpg: replace file with optimized version as provided by PSI
  2. pizzeria.jpg:  hoist the optimized copy provided by PSI to the root images directory, further resize the image to allow it be served at natural dimensions.
  3. Content section thumbnails: use local copies and fix CSS to serve images at natural dimensions.
  4. All images: add height and width attributes
<br>_From: Mobile/Dektop 61/68 To: 76/89 **Change: +15/+21**_
3. Eliminate render-blocking JavaScript and CSS in above-the-fold content:
  1. Add media attribute to print stylesheet, to allow it to load asychronously.
  2. Inline the webfonts in the CSS file.
  3. Inline the CSS in the HTML
  4. Inline perfmatters.js in the HTML, before CSS to ensure it is not render blocking. This JavaScript could be loaded asynchronously but it is small enough to be inlined in the head.
  5. Remove Google Analytics scripts. Again they could be async'd, if they were needed.
  6. Remove unneccessary meta tags from head.




###Part 2: Optimize Frames per Second in pizza.html

