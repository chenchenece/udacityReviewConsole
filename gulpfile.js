'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourceMaps = require('gulp-sourcemaps'),
    copy = require('gulp-copy'),
    clean = require('gulp-clean'),
    utils = require('gulp-util'),
    cleanCSS = require('gulp-clean-css');

var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task("dev-serve",['watchFiles'], function(){

  browserSync.init({
      server: {
          baseDir: "./src"
      }
  });

});

gulp.task('watchFiles', function(){
  gulp.watch(['src/assets/css/**'], ['minifyStyles']);
  gulp.watch(['src/assets/js/**'], ['afterMinifyScripts']);
});

gulp.task("build", ['cleanBuild'], function(done){
  gulp.start(['copyImages','minifyStyles', 'minifyScripts']);
  done();
});

gulp.task("minifyScripts", function(){
  return gulp.src(["src/assets/js/**"])
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('src/dist/js'));
});

gulp.task('afterMinifyScripts', ['minifyScripts'], function(done){
  browserSync.reload();
  done();
});

gulp.task("minifyStyles", function(){
  return gulp.src(["src/assets/css/*.css"])
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('src/dist/css'))
      .pipe(browserSync.stream());
});

gulp.task("copyImages", function(){
  return gulp.src("src/assets/imgs/**")
      .pipe(gulp.dest("src/dist/imgs"));
});

gulp.task("cleanBuild", function(){
  return gulp.src("src/dist", {read: false})
      .pipe(clean());
});
