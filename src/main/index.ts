import { app, BrowserWindow } from 'electron';
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

async function testDB() {
    createConnection(config as any)
        .then(async conn => {
            const res = await conn.query('SELECT 1+1');
            debug('testing db', { successful: true, res });
        })
        .catch(err => {
            debug('testing db', { successful: false, err });
        });
}

async function testUbi() {
    // ubi.setCredentials(yourMail, yourPass);
    const res = await ubi.findByName(Platform.PC, 'LaxisB');
    const laxis = res[0];
    const level = await ubi.getLevel(Platform.PC, [laxis.id]);
    const ranks = await ubi.getRanks(Platform.PC, [laxis.id], {});
    debug('testing ubi', { successful: !!res, res, level, ranks });
}

testDB();
testUbi();

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    const isFirstRun = store.get('firstRun', true);
    if (isFirstRun) {
        // run initial setup, etc
        store.set('firstRun', false);
    }
    console.log('creating windows');
    const mainWindow = new BrowserWindow({
        show: false,
        width: 1280,
        height: 720,
    });
    const qs = stringify({
        isFirstRun,
    });
    mainWindow.loadURL(`http://localhost:2442/app?${qs}`);
    mainWindow.setTitle('R6DB');

    const loadingWindow = new BrowserWindow({
        show: false,
        width: 300,
        height: 300,
    });
    loadingWindow.loadURL('http://localhost:2442/loading');

    loadingWindow.webContents.on('did-finish-load' as any, () => {
        loadingWindow.show();
    });

    mainWindow.webContents.on('did-finish-load' as any, () => {
        loadingWindow.hide();
        loadingWindow.destroy();
        mainWindow.show();
    });
});
