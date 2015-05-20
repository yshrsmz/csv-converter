import Menu from 'menu';
import BrowserWindow from 'browser-window';
import app from 'app';
import fs from 'fs-plus';
import path from 'path';
import os from 'os';
import net from 'net';
import url from 'url';
import ipc from 'ipc';

import { EventEmitter as EventEmitter } from 'events';
import _ from 'lodash';
import { spawn as spawn } from 'child_process';

import AppMenu from './AppMenu';
import AppWindow from './AppWindow';

import CsvParser from './CsvParser';
import Converter from './Converter';

import consts from '../common/consts';

export default class Application extends EventEmitter {

    constructor(options) {
        super();

        this.devMode = options.devMode;
        this.pkgJson = require('../package.json');
        this.windows = [];

        app.on('window-all-closed', () => {
            if (['win32', 'linux'].indexOf(process.platform) > 0) {
                app.quit();
            }
        });

        this.handleEvents();
        this.openWithOptions(options);

        //Converter.convert({
        //    data: {},
        //    fileName: 'aaa',
        //    outputDir: 'bbb',
        //    templatePath: '/template/help.md.hbs'
        //});
    }

    openWithOptions(options) {
        let newWindow = this.openWindow(options);

        newWindow.show();
        this.windows.push(newWindow);
        this.lastFocusedWindow = newWindow;

        newWindow.on('closed', () => this.removeAppWindow(newWindow));
    }

    openWindow(options) {
        var appWindow = new AppWindow(options);

        this.menu = new AppMenu({pkg: this.pkgJson});

        this.menu.attachToWindow(appWindow);
        this.menu.on('application:quit', () => app.quit());
        this.menu.on('window:reload', () => BrowserWindow.getFocusedWindow().reload());
        this.menu.on('window:toggle-full-screen', () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        });
        this.menu.on('window:toggle-dev-tools', () => BrowserWindow.getFocusedWindow().toggleDevTools());
        this.menu.on('application:run-specs', () => openWithOptions({test: true}));

        return appWindow;
    }

    removeAppWindow(appWindow) {
        this.windows.forEach((w, idx) => {
            if (w === appWindow) {
                this.windows.splice(idx, 1);
            }
        });
    }

    handleEvents() {


        ipc.on(consts.ipc.pick.dir.send, (event, arg) => {
            this.promptForPath('folder', (selectedPaths) => {
                event.sender.send(consts.ipc.pick.dir.reply, selectedPaths);
            });
        });

        ipc.on(consts.ipc.convert.send, (event, arg) => {
            let params = JSON.parse(arg);
        });

        (new CsvParser()).listen();
    }

    promptForPath(type, callback) {
        let properties;
        switch (type) {
            case 'file':
                properties = ['openFile'];
                break;
            case 'folder':
                properties = ['openDirectory'];
                break;
            case 'all':
                properties = ['openFile', 'openDirectory'];
                break;
            default:
                throw new Error(`${type} is an invalid type for promptForPath`);
        }

        let parentWindow = (process.platform === 'darwin') ? null : BrowserWindow.getFocusedWindow();

        let openOptions = {
            properties: properties.concat(['multiSelections', 'createDirectory']),
            title: 'Open'
        };

        let dialog = require('dialog');
        dialog.showOpenDialog(parentWindow, openOptions, callback);
    }



}
