'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var config = require('../config.js').babel;

gulp.task('babel', function() {
    return gulp.src(config.src)
        .pipe(babel())
        .pipe(gulp.dest(config.dest));
});
