import Menu from 'menu';
import app from 'app';
import ipc from 'ipc';
import path from 'path';
import os from 'os';
import net from 'net';
import url from 'url';

import {EventEmitter as EventEmitter} from 'events';
import BrowserWindow from 'browser-window';
import _ from 'lodash';

export default class AppWindow extends EventEmitter {

    constructor(options) {
        super();

        this.loadSettings = {
            bootstrapScript: require.resolve('../renderer/index')
        };

        this.loadSettings = _.extend(this.loadSettings, options);

        let windowOpts = {
            width: 1000,
            height: 700,
            'min-width': 1000,
            'min-height': 700,
            title: options.title ? options.title : 'You should set options.title',
            'web-preferences': {
                'subpixel-font-scaling': true,
                'direct-write': true
            }
        };

        windowOpts = _.extend(windowOpts, this.loadSettings);

        this.window = new BrowserWindow(windowOpts);

        this.window.on('closed', e => this.emit('closed', e));

        this.window.on('devtools-opend', e =>
            this.window.webContents.send('window:toggle-deb-tools', true));

        this.window.on('devtools-closed', e =>
            this.window.webContents.send('window:toggle-dev-tools', false));
    }

    show() {

        let targetPath = path.resolve(__dirname, '..', '..', 'index.html')

        let targetUrl = url.format({
            protocol: 'file',
            pathname: targetPath,
            slashes: true,
            query: { loadSettings: JSON.stringify(this.loadSettings)}
        });

        this.window.loadUrl(targetUrl);
        this.window.show();
    }

    reload() {
        this.webContents.reload();
    }

    toggleFullScreen() {
        this.window.setFullScreen(!this.window.isFullScreen());
    }

    toggleDevTools() {
        this.window.toggleDevTools();
    }

    close() {
        this.window.close();
        this.window = null;
    }
}
