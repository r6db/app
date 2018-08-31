import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { stringify } from 'querystring';
import { createConnection } from 'typeorm';
import * as connectionInfo from '../../ormconfig.js';
import { store } from './store';
import * as ubi from './ubi';
import './server';
import { Platform } from 'shared/constants';
import makeDebug from 'debug';

const debug = makeDebug('r6db:main');

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
    debug('show loading and run runtime tests');
    const loadingWindow = new BrowserWindow({
        show: false,
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

    function bootstrap() {
        Promise.resolve()
            .then(() => {
                loadingWindow.webContents.send('loading_status', { message: 'Checking Database', isFinished: false });
                return testDB();
            })
            .then(() => {
                loadingWindow.webContents.send('loading_status', { message: 'Loading App', isFinished: false });
                debug('tests ok');

                const mainWindow = new BrowserWindow({
                    show: false,
                    width: 1280,
                    height: 720,
                });

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
                    loadingWindow.webContents.send('loading_status', { message: 'waiting lol', isFinished: true });
                    mainWindow.show();

                    // hardcode this until we sent a trigger from the app
                    setTimeout(() => {
                        loadingWindow.destroy();
                    }, 2000);
                });
            })
            .catch(err => debug('bootstrap error', err));
    }
});
