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
  <li>M77, D91 <strong>Optimize CSS delivery.</strong> Remove webfont from critical rendering path.
  <li>M87, D93 <strong>Optimize CSS delivery.</strong> Minify and inline main CSS.
  <li>M94, D97 <strong>Reduce Server Response, Leverage Browser Caching, Enable Compression.</strong> I have no control over these with SimpleHTTPServer/ngrok (at least I don't think I do), am hoping when I serve via github pages that they will already be nicely configured for me. <strong>Minify HTML.</strong> Use pagespeed extension to grab optimized HTML, also delete 'author' and 'description' meta tags.
  <li><strong>M96, D97 final score</strong> before server side optimizations.
  <li>TODO: lazyload fonts, server-side optimizations and use build tools to minify and inline.
</ol>




<h2>Part 2: Optimize Frames per Second in pizza.html</h2>

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
