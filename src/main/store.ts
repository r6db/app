import Store from 'electron-store';
import { app } from 'electron';
import * as path from 'path';

export const store = new Store({
    cwd: path.resolve(app.getPath('documents'), 'r6db/'),
    fileExtension: '.bin',
    encryptionKey: 'not for security, but to make it more annoying to tamper with',
});
