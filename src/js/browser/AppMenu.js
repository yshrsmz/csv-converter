import app from 'app';
import ipc from 'ipc';
import Menu from 'menu';
import path from 'path';

import season from 'season';
import _ from 'lodash';
import {EventEmitter as EventEmitter} from 'events';

export default class ApplicationMenu extends EventEmitter {
    constructor(options) {
        super();

        let menuJson = season.resolve(path.join(__dirname, '..', 'menus', `${process.platform}.json`));
        let template = season.readFileSync(menuJson);
        this.template = this.translateTemplate(template.menu, options.pkg);
    }

    attachToWindow(window) {
        this.menu = Menu.buildFromTemplate(_.cloneDeep(this.template));
        Menu.setApplicationMenu(this.menu);
    }

    wireUpMenu(menu, command) {
        menu.click = () => this.emit(command);
    }

    translateTemplate(template, pkgJson) {
        let emitter = this.emit;

        Object.keys(template).forEach((key) => {
            let item = template[key];
            item.metadata || (item.metadata = {});

            if (item.label) {
                item.label = (_.template(item.label))(pkgJson);
            }

            if (item.command) {
                this.wireUpMenu(item, item.command);
            }

            if (item.submenu) {
                this.translateTemplate(item.submenu, pkgJson);
            }
        });

        return template;
    }

    acceleratorForCommand(command, keystrokesByCommand) {
        let ref;
        let firstKeystroke = (ref = keystrokesByCommand[command]) != null ? ref[0] : void 0;

        if (!firstKeystroke) {
            return null;
        }

        let modifiers = firstKeystroke.split('-');
        let key = modifiers.pop();

        modifiers = modifiers.map((modifier) => {
            return modifier.replace(/shift/ig, 'Shift')
                .replace(/cmd/ig, 'Command')
                .replace(/ctrl/ig, 'Ctrl')
                .replace(/alt/ig, 'Alt');
        });

        let keys = modifiers.concat([key.toUpperCase()]);
        return keys.join("+");

    }
}
