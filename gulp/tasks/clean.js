'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var del = require('del');
var config = require('../config').clean;

gulp.task('clean', function(cb) {
    del(config.src, cb);
});
