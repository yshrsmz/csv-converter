'use strict';

var gulp = require('gulp');
var config = require('../config').template;

gulp.task('template', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
