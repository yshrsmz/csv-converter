'use strict';

import fs from 'fs-plus';
import path from 'path';
import async from 'async';
import Handlebars from 'handlebars';


export default {
    convert(options, cb) {
        let {
            data,
            fileName,
            outputDir,
            templatePath
            } = options;

        console.log('dirname', __dirname);

        templatePath = path.resolve(path.join(__dirname, '..', templatePath));

        console.log('templatePath', templatePath);

        let fileNameTmpl = Handlebars.compile(fileName);

        async.waterfall([
            function(callback) {
                // read content template
                fs.readFile(templatePath, 'utf8', (err, data) => {
                    if (err) {
                        callback(Error(`${templatePath} not exists`), null);
                        return;
                    }

                    console.log(`template: ${data}`);

                    callback(null, Handlebars.compile(data));
                });
            },
            function(contentTmpl, callback) {
                // write files

                async.eachLimit(data, 5, function(row, cb) {

                    let _fileName = fileNameTmpl(row);
                    let _content = contentTmpl(row);
                    let _filePath = path.join(outputDir, _fileName);

                    fs.writeFile(_filePath, _content, (err) => {
                        if (err) {
                            console.log(`[FAIL] ${_filePath}`);
                            cb(err);
                            return;
                        }

                        console.log(`[SUCCESS] ${_filePath}`);

                        cb(null);
                    });

                }, callback);
            }
        ]);
    }
}
