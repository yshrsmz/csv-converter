'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var config = require('../config.js').babel;

gulp.task('babel', function() {
    return gulp.src(config.src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(config.dest));
});
