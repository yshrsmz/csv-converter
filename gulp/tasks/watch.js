'use strict';

var gulp = require('gulp');
var config = require('../config').watch;

gulp.task('watch', ['build'], function() {
    config.targets.forEach(function(target) {
        gulp.watch(target.src, target.tasks);
    });
});
