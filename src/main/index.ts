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
async function testUbi() {
    try {
        ubi.setCredentials(store.get('user.email', ''), process.env.PASS || '');
        const res = await ubi.findByName(Platform.PC, 'LaxisB');
        const laxis = res[0];
        const ubiWorks = await Promise.all([
            ubi.getLevel(Platform.PC, [laxis.id]),
            ubi.getName(Platform.PC, [laxis.id]),
            ubi.getRanks(Platform.PC, [laxis.id], {}),
            ubi.getStats(Platform.PC, [laxis.id]),
        ]);
        debug('testing ubi', { successful: !!ubiWorks });
        return ubiWorks;
    } catch (error) {
        debug('testing ubi', { successful: false, error });
        return Promise.reject();
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
    debug('show loading and run runtime tests');
    const loadingWindow = new BrowserWindow({
        show: false,
        width: 400,
        height: 600,
        vibrancy: 'appearance-based',
    });
    loadingWindow.loadURL('http://localhost:2442/loading');

    loadingWindow.webContents.on('did-finish-load' as any, () => {
        loadingWindow.show();
        bootstrap();
    });

    function bootstrap() {
        Promise.resolve()
            .then(() => {
                loadingWindow.webContents.send('loading_status', 'Checking Database');
                return testDB();
            })
            .then(() => {
                loadingWindow.webContents.send('loading_status', 'Checking Ubi Api');
                return testUbi();
            })
            .then(() => {
                loadingWindow.webContents.send('loading_status', 'Loading App');
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
                    loadingWindow.hide();
                    loadingWindow.destroy();
                    mainWindow.show();
                });
            })
            .catch(() => process.exit(1));
    }
});
