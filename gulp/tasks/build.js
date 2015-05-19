'use strict';

var gulp = require('gulp');

gulp.task('build', ['babel', 'styles', 'html', 'images', 'template', 'electron']);
