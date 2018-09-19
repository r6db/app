import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import windowStateKeeper from 'electron-window-state';
import * as path from 'path';
import { store } from './store';
import { Domain } from './domain';
import makeDebug from 'debug';
import { makeServer } from './server';

const debug = makeDebug('r6db:main');

const IS_PROD = process.env.NODE_ENV === 'production';

const DB_PATH = IS_PROD ? path.resolve(app.getPath('documents'), 'r6db/data.sqlite') : 'dev.sqlite';
let domain;

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    domain.destroy();
    app.quit();
});

app.on('ready', async () => {
    const image = nativeImage.createFromPath(path.resolve(__dirname, './logo.png'));
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
        vibrancy: 'dark',
        icon: image,
    });
    mainWindowState.manage(mainWindow);

    mainWindow.setMenu(null);

    const loadingWindow = new BrowserWindow({
        resizable: false,
        movable: false,
        width: 300,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        show: false,
        x: 150 + mainWindowState.x + mainWindowState.width / 2,
        y: 150 + mainWindowState.y + mainWindowState.height / 2,
    });

    domain = new Domain({
        dbPath: DB_PATH,
        store,
    });

    debug('init app');
    // TODO: change port in DEV (for webpack-dev-server)
    loadingWindow.loadURL('http://localhost:2442/loading');
    loadingWindow.webContents.on('did-finish-load', () => loadingWindow.show());

    await domain.init();

    // build querystring for app mounting
    // TODO: change port in DEV (for webpack-dev-server)
    mainWindow.loadURL(`http://localhost:2442`);
    mainWindow.setTitle('R6DB');
    mainWindow.webContents.on('did-finish-load', async () => {
        // hardcode this until we sent a trigger from the app
        loadingWindow.destroy();
        mainWindow.show();
        if (!IS_PROD) {
            mainWindow.webContents.openDevTools();
        }
    });

    await makeServer(domain, {
        staticFiles: IS_PROD,
        port: IS_PROD ? 2442 : 2443,
    });
});
