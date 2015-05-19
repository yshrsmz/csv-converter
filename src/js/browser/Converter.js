'use strict';

import fs from 'fs-plus';
import path from 'path';
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

        fs.readFile(templatePath, 'utf8', (err, data) => {
            if (err) {
                throw new Error(`${templatePath} not exists`);
                return;
            }

            let contentTmpl = Handlebars.compile(data);
        });



        //let fileNameTmpl = Handlebars.compile()

        //data.forEach((row) => {
        //
        //});
    }
}
