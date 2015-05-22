'use strict';

import fs from 'fs-plus';
import path from 'path';
import async from 'async';
import Handlebars from 'handlebars';

let removeReservedChar = function(fileName) {
    return fileName.replace(/[\/\\\?%\*:\|"<>]/g, '');
};


export default {
    convert(options, callback) {
        let {
            data,
            fileName,
            outputDir,
            templatePath
            } = options;

        console.log('dirname', __dirname);

        templatePath = path.resolve(path.join(__dirname, '..', '..', templatePath));

        console.log('templatePath', templatePath);

        let fileNameTmpl = Handlebars.compile(fileName);

        async.waterfall([
            function(_callback) {
                // read content template
                fs.readFile(templatePath, 'utf8', (err, data) => {
                    if (err) {
                        _callback(Error(`${templatePath} not exists`), null);
                        return;
                    }

                    console.log(`template: ${data}`);

                    _callback(null, Handlebars.compile(data));
                });
            },
            function(contentTmpl, _callback) {
                // write files

                async.eachLimit(data, 5, function(row, __callback) {

                    let _fileName = removeReservedChar(fileNameTmpl(row));
                    let _content = contentTmpl(row);
                    let _filePath = path.join(outputDir, _fileName);

                    fs.writeFile(_filePath, _content, (err) => {
                        if (err) {
                            console.log(`[FAIL] ${_filePath}`);
                            __callback(err);
                            return;
                        }

                        console.log(`[SUCCESS] ${_filePath}`);

                        __callback(null);
                    });

                }, _callback);
            }
        ], callback);
    }
}
