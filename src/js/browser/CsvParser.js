'use strict';

import ipc from 'ipc';

import csv from 'csv';
import fs from 'fs-plus';

import consts from '../common/consts';

export default class CsvParser {
    constructor() {
        console.log('CsvParser constructor');
        this.listen = this.listen.bind(this);
    }

    listen() {
        console.log('listen');

        ipc.on(consts.ipc.csv.src.send, (event, arg) => {
            console.log('CsvParser async-tsv-sent-message', arg);

            if (arg && fs.existsSync(arg)) {
                // file exists
                this.parse(arg, (err, data) => {

                    if (err) {
                        event.sender.send(consts.ipc.csv.src.reply, JSON.stringify({error: true, message: err.message}));
                        return;
                    }

                    event.sender.send(consts.ipc.csv.src.reply, JSON.stringify({error: false, data: data}));
                });
            } else {
                event.sender.send(consts.ipc.csv.src.reply, JSON.stringify({error: true, message: 'file not exists'}));
            }
        });
    }

    parse(filePath, cb) {
        let rs = fs.createReadStream(filePath);
        let parser = csv.parse({/*delimiter: '	',*/ columns: true},  cb);

        rs.pipe(parser);
    }
}
