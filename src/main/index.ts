import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import * as path from 'path';
import { stringify } from 'querystring';
import { createConnection } from 'typeorm';
import * as connectionInfo from '../../ormconfig.js';
import { store } from './store';
import makeDebug from 'debug';
import { delay } from 'bluebird';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const debug = makeDebug('r6db:main');

if (process.env.NODE_ENV === 'production') {
    // only run server in prod; dev has the webpack-serve
    // tslint:disable-next-line
    require('./server');
}

const config: SqliteConnectionOptions = {
    ...connectionInfo,
    database: path.resolve(app.getPath('documents'), 'r6db/data.sqlite'),
} as any;

if (process.env.USER) {
    store.set('user.email', process.env.USER);
}

async function testDB() {
    try {
        const connection = await createConnection(config);
        const res = connection.query('SELECT 1 + 1');
        debug('testing db', { successful: true, res });
    } catch (err) {
        debug('testing db', { successful: false, err });
        throw err;
    }
}

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 1280,
        defaultHeight: 720,
    });
    debug('show loading and run runtime tests');
    const loadingWindow = new BrowserWindow({
        show: false,
        resizable: false,
        movable: false,
        width: 300,
        height: 300,
        frame: false,
        alwaysOnTop: true,
    });
    loadingWindow.loadURL('http://localhost:2442/loading');

    loadingWindow.webContents.on('did-finish-load', async () => {
        loadingWindow.show();
        try {
            await bootstrap();
        } catch (err) {
            debug('bootstrap error', err);
        }
    });

    function sentLoadingStatus(message, isFinished) {
        if (loadingWindow && !loadingWindow.isDestroyed()) {
            loadingWindow.webContents.send('loading_status', { message, isFinished });
        }
    }

    async function bootstrap() {
        sentLoadingStatus('Checking Database', false);
        await testDB();
        debug('tests ok');
        sentLoadingStatus('Loading App', false);

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

        const isFirstRun = store.get('firstRun', true);
        if (isFirstRun) {
            // run initial setup, etc
            store.set('firstRun', false);
        }
        debug('creating windows');

        // build querystring for app mounting
        const qs = stringify({
            isFirstRun,
        });
        mainWindow.loadURL(`http://localhost:2442/app?${qs}`);
        mainWindow.setTitle('R6DB');
        mainWindow.webContents.on('did-finish-load', async () => {
            sentLoadingStatus('Starting', true);

            // hardcode this until we sent a trigger from the app
            await delay(2000);
            loadingWindow.destroy();
            mainWindow.show();
            if (process.env.NODE_ENV === 'development') {
                mainWindow.webContents.openDevTools();
            }
        });
    }
});
