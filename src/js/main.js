var app = require('app');  // Module to control application life.
var url = require('url');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var fs = require('fs-plus');
var path = require('path');

// Report crashes to our server.
require('crash-reporter').start();

var nslog = console.log;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

global.shellStartTime = Date.now();

process.on('uncaughtException', (error = {}) => {
    error.message && nslog(error.message);
    error.stack && nslog(error.stack);
});

var parseCommandLine = function parseCommandLine() {
    var version = app.getVersion();

    var yargs = require('yargs')
        .alias('d', 'dev').boolean('d').describe('d', 'Run in development mode.')
        .alias('h', 'help').boolean('h').describe('h', 'Print this usage message.')
        .alias('l', 'log-file').string('l').describe('l', 'Log all output to file.')
        .alias('t', 'test').boolean('t').describe('t', 'Run the specified specs and exit with error code on failures.')
        .alias('v', 'version').boolean('v').describe('v', 'Print the version');

    var args = yargs.parse(process.argv.slice(1));

    process.stdout.write(`${JSON.stringify(args)}\n`);

    if (args.help) {
        var help = "";
        yargs.showHelp(helpString => help += helpString);
        process.stdout.write(`${help}\n`);
        proces.exit(0);
    }

    if (args.version) {
        process.stdout.write(`${version}\n`);
        process.exit(0);
    }

    var devMode = args['dev'];
    var test = args['test'];
    var exitWhenDone = test;
    var logFile = args['log-file'];

    return {
        devMode,
        test,
        exitWhenDone,
        logFile
    };
};

var start = function start() {
    app.commandLine.appendSwitch('js-flags', '--harmony');

    var args = parseCommandLine();

    if (args.devMode) {
        app.commandLine.appendSwitch('remote-debugging-port', '8315');
    }

    // This method will be called when atom-shell has done everything
    // initialization and ready for creating browser windows.
    app.on('ready', function () {

        let Application = require('./browser/Application');

        global.application = new Application(args);
        console.log(`App load time: ${Date.now() - global.shellStartTime}ms`);
    });
};


start();

