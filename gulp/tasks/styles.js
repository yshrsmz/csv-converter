'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var config = require('../config').styles

gulp.task('styles', ['css', 'less']);

gulp.task('css', function() {
    return gulp.src(config.css.src)
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('less', function() {
    return gulp.src(config.less.src)
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(config.less.dest));
});
