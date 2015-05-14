'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var config = require('../config').styles

gulp.task('styles', ['less']);

gulp.task('less', function() {
    return gulp.src(config.less.src)
        .pipe(less())
        .pipe(gulp.dest(config.less.dest));
});
