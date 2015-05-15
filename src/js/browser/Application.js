import Menu from 'menu';
import BrowserWindow from 'browser-window';
import app from 'app';
import fs from 'fs-plus';
import path from 'path';
import os from 'os';
import net from 'net';
import url from 'url';

import { EventEmitter as EventEmitter } from 'events';
import _ from 'lodash';
import { spawn as spawn } from 'child_process';

import AppMenu from './AppMenu';
import AppWindow from './AppWindow';

export default class Application extends EventEmitter {

    constructor(options) {
        super();

        this.devMode = options.devMode;
        console.log(__dirname);
        this.pkgJson = require('../package.json');
        this.windows = [];

        app.on('window-all-closed', () => {
            if (['win32', 'linux'].indexOf(process.platform) > 0) {
                app.quit();
            }
        });

        this.openWithOptions(options);
    }

    openWithOptions(options) {
        let newWindow = this.openWindow(options);

        newWindow.show();
        this.windows.push(newWindow);

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
}
