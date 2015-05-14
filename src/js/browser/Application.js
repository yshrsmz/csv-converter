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

export default class Application extends EventEmitter {

    constructor(options) {
        super();

        this.devMode = options.devMode;
        this.pkgJson = require('../../package.json');
        this.windows = [];

        app.on('window-all-closed', () => {
            if (['win32', 'linux'].indexOf(process.platform) > 0) {
                app.quit();
            }
        });
    }
}
