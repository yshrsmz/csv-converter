'use strict';

export default {
    ipc: {
        csv: {
            src: {
                send: 'ipc.csv.src.send',
                reply: 'ipc.csv.src.reply'
            }
        },
        pick: {
            file: {
                send: 'ipc.pick.file.send',
                reply: 'ipc.pick.file.reply'
            },
            dir: {
                send: 'ipc.pick.dir.send',
                reply: 'ipc.pick.dir.reply'
            }
        },
        convert: {
            send: 'ipc.convert.send',
            reply: 'ipc.convert.reply'
        }
    }
}
