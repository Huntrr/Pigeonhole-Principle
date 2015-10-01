'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');

var dest = './dist';

var watcher = gulp.watch('src/**/*.*', ['build']);


gulp.task('clean', function () {
  return gulp.src(dest, {read: false})
  .pipe(clean());
});


gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(browserify({
    insertGlobals : true,
    debug : !gulp.env.production,
    transform: ['babelify']
  }))
  .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
  .pipe(gulp.dest(dest));
});

gulp.task('html', function(){
  gulp.src('src/**/*.html')
  .pipe(gulp.dest(dest));
});

gulp.task('css', function () {
  gulp.src('src/css/css')
  .pipe(gulp.dest(dest));
});

gulp.task('static', function () {
  gulp.src('src/static/*')
  .pipe(gulp.dest(dest));
});

gulp.task('build', ['clean'], function () {
  gulp.run(['html', 'babel', 'css', 'static']);
});

gulp.task('serve', ['build'], function () {
  watcher.on('change', function(e) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
