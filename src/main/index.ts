import { app, BrowserWindow, ipcMain } from 'electron';
import windowStateKeeper from 'electron-window-state';
import * as path from 'path';
import { stringify } from 'querystring';
import { createConnection } from 'typeorm';
import * as connectionInfo from '../../ormconfig.js';
import { store } from './store';
import * as ubi from './ubi';
import { Platform } from 'shared/constants';
import makeDebug from 'debug';

const debug = makeDebug('r6db:main');

if (process.env.NODE_ENV === 'production') {
    // only run server in prod; dev has the webpack-serve
    // tslint:disable-next-line
    require('./server');
}

const config = {
    ...connectionInfo,
    database: path.resolve(app.getPath('documents'), 'r6db/data.sqlite'),
};

if (process.env.USER) {
    store.set('user.email', process.env.USER);
}

async function testDB() {
    return createConnection(config as any)
        .then(async conn => {
            const res = await conn.query('SELECT 1+1');
            debug('testing db', { successful: true, res });
        })
        .catch(err => {
            debug('testing db', { successful: false, err });
            throw err;
        });
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

    loadingWindow.webContents.on('did-finish-load' as any, () => {
        loadingWindow.show();
        bootstrap();
    });

    function sentLoadingStatus(message, isFinished) {
        if (loadingWindow && !loadingWindow.isDestroyed()) {
            loadingWindow.webContents.send('loading_status', { message, isFinished });
        }
    }

    function bootstrap() {
        Promise.resolve()
            .then(() => {
                sentLoadingStatus('Checking Database', false);
                return testDB();
            })
            .then(() => {
                sentLoadingStatus('Loading App', false);
                debug('tests ok');

                const mainWindow = new BrowserWindow({
                    show: false,
                    x: mainWindowState.x,
                    y: mainWindowState.y,
                    width: mainWindowState.width,
                    height: mainWindowState.height,
                    minWidth: 960,
                    minHeight: 540,
                    maxWidth: 7680,
                    maxHeight: 4320,
                    // backgroundColor: '#383838',
                });
                mainWindowState.manage(mainWindow);

                const isFirstRun = store.get('firstRun', true);
                if (isFirstRun) {
                    // run initial setup, etc
                    store.set('firstRun', false);
                }
                console.log('creating windows');

                // build querystring for app mounting
                const qs = stringify({
                    isFirstRun,
                });
                mainWindow.loadURL(`http://localhost:2442/app?${qs}`);
                mainWindow.setTitle('R6DB');
                mainWindow.webContents.on('did-finish-load' as any, () => {
                    sentLoadingStatus('Starting', true);
                    // mainWindow.show() was on this line, moved to line 96 for now
                    // hardcode this until we sent a trigger from the app
                    setTimeout(() => {
                        loadingWindow.destroy();
                        mainWindow.show();
                        if (process.env.NODE_ENV === 'development') {
                            mainWindow.webContents.openDevTools();
                        }
                    }, 2000);
                });
            })
            .catch(err => debug('bootstrap error', err));
    }
});
