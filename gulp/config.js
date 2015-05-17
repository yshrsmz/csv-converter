'use strict';

var src = './src';
var dest = './build';

module.exports = {
    electron: {
        configFile: {
            src: src + '/template/package.json.hbs',
            dest: dest,
            name: 'package.json'
        },
        menus: {
            src: src + '/menus/**/*.json',
            dest: dest + '/menus'
        },
        build: {
            version: '0.26.0',
            src: dest,
            main: 'main.js',
            darwin: {
                dest: './release/darwin.zip'
            }
        }
    },
    babel: {
        src: [src + '/js/**/*.js', src + '/js/**/*.jsx'],
        dest: dest
    },
    styles: {
        less: {
            src: src + '/less/main.less',
            dest: dest + '/styles'
        }
    },
    html: {
        src: src + '/html/**/*.html',
        dest: dest
    },
    images: {
        src: src + '/html/**/*.html',
        dest: dest + '/images'
    },
    watch: {
        targets: [
            {
                src: [src + '/js/**/*.js', src + '/js/**/*.jsx'],
                tasks: ['babel']
            },
            {
                src: [src + '/less/**/*'],
                tasks: ['styles']
            },
            {
                src: [src + '/images/**/*'],
                tasks: ['images']
            },
            {
                src: [src + '/html/**/*.html'],
                tasks: ['html']
            }
        ]

    }
};
