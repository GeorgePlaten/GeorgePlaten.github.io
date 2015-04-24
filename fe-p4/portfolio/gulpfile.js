// Include gulp
var gulp = require('gulp');

// Include plugins
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inlinesource = require('gulp-inline-source');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var del = require('del');

// Minify javascript
gulp.task('scripts', function() {
  return gulp.src('source/js/*.js')
    // .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('prodn/js'));
});
gulp.task('viewsScripts', function() {
  return gulp.src('source/views/js/*.js')
    // .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('prodn/views/js'));
});

// Inline CSS, minify HTML
gulp.task('pages', function() {
  return gulp.src('source/*.html')
    // .pipe(rename({suffix: '.min'}))
    .pipe(inlinesource())
    .pipe(minifyHTML({empty:true}))
    .pipe(gulp.dest('prodn'));
});
gulp.task('viewsPages', function() {
  return gulp.src('source/views/*.html')
    // .pipe(rename({suffix: '.min'}))
    .pipe(inlinesource())
    .pipe(minifyHTML({empty:true}))
    .pipe(gulp.dest('prodn/views'));
});

// Minify CSS
gulp.task('styles', function() {
  return gulp.src(['source/css/*.css', '!source/css/style.css'])
    // .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('prodn/css'));
});
gulp.task('viewsStyles', function() {
  return gulp.src(['source/views/css/*.css', '!source/views/css/style.css'])
    // .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('prodn/views/css'));
});

// Clean directories
var dirsToClean = [
  'prodn/*.html',
  'prodn/js',
  'prodn/css',
  // 'prodn/img',
  'prodn/views/*.html',
  'prodn/views/js',
  'prodn/views/css',
  // 'prodn/views/images',
];
gulp.task('clean', function(cb) {
    del(dirsToClean, cb);
});

// Watch files
gulp.task('watch', function() {
  gulp.watch('source/js/*.js', ['scripts']);
  gulp.watch('source/*.html', ['pages']);
  gulp.watch('source/css/*.css', ['styles']);
  gulp.watch('source/views/js/*.js', ['viewsScripts']);
  gulp.watch('source/views/*.html', ['viewsPages']);
  gulp.watch('source/views/css/*.css', ['viewsStyles']);
});

// Default Task
gulp.task('default', ['scripts', 'viewsScripts'
                      ,'pages', 'viewsPages'
                      ,'styles', 'viewsStyles'
                      ]);