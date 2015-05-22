'use strict';

var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var atomshell = require('gulp-atom-shell');

var config = require('../config.js').electron;
var packageConfig = require('../../package.json');


gulp.task('electron-config', function() {
    var appConfig = {
        name: packageConfig.name,
        productName: packageConfig.productName,
        version: packageConfig.version,
        main: config.build.main
    };

    return gulp.src(config.configFile.src)
        .pipe(handlebars(appConfig))
        .pipe(rename(config.configFile.name))
        .pipe(gulp.dest(config.configFile.dest))
});

gulp.task('electron-menu-json', function() {

    return gulp.src(config.menus.src)
        .pipe(gulp.dest(config.menus.dest));
});


gulp.task('electron-copy-module', function() {
    var dependencies = Object.keys(packageConfig.dependencies).map(function(dependency) {
        return 'node_modules/' + dependency + '/**/*';
    });

    return gulp.src(dependencies, {base: './node_modules/'})
        .pipe(gulp.dest('./build/node_modules'));
});

gulp.task('electron-src', ['electron-config', 'electron-copy-module', 'electron-menu-json']);

gulp.task('electron', ['electron-src'], function() {
    return gulp.src(config.build.src + '/**')
        .pipe(atomshell({
            version: config.build.version,
            platform: 'darwin',
            token: process.env.GITHUB_ACCESS_TOKEN
        }))
        .pipe(atomshell.zfsdest(config.build.darwin.dest));
});
