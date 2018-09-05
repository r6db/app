import { app, BrowserWindow, ipcMain } from 'electron';
import windowStateKeeper from 'electron-window-state';
import * as path from 'path';
import { store } from './store';
import { Domain } from './domain';
import makeDebug from 'debug';

const debug = makeDebug('r6db:main');

const IS_PROD = process.env.NODE_ENV === 'production';

if (IS_PROD) {
    // only run server in prod; dev has the webpack-serve
    // tslint:disable-next-line
    require('./server');
}
const DB_PATH = IS_PROD ? path.resolve(app.getPath('documents'), 'r6db/data.sqlite') : 'dev.sqlite';
let domain;

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    domain.destroy();
    app.quit();
});

app.on('ready', async () => {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 1280,
        defaultHeight: 720,
    });
    debug('show loading and run runtime tests');
    const mainWindow = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,

        minWidth: 960,
        minHeight: 540,

        maxWidth: 7680,
        maxHeight: 4320,

        x: mainWindowState.x,
        y: mainWindowState.y,
        show: false,
    });
    mainWindowState.manage(mainWindow);

    const loadingWindow = new BrowserWindow({
        resizable: false,
        movable: false,
        width: 300,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        show: false,
        x: mainWindowState.x + mainWindowState.width / 2 - 150,
        y: mainWindowState.y + mainWindowState.height / 2 - 150,
    });

    domain = new Domain({
        dbPath: DB_PATH,
        appWindow: mainWindow,
        appEmitter: ipcMain,
        loadingWindow,
        store,
    });
    domain.init();
});
