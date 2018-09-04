import { BrowserWindow } from 'electron';
import { delay } from 'bluebird';
import produce from 'immer';
import { store } from '../store';
import { createConnection } from '../db';
import makeDebug from 'debug';
const debug = makeDebug('r6db:domain');

const IS_PROD = process.env.NODE_ENV === 'production';

interface IDomainOptions {
    // path to sqlite db
    dbPath: string;
    appWindow: BrowserWindow;
    loadingWindow: BrowserWindow;
}

interface IDomainState {
    firstRun: boolean;
    now: Date;
}

export class Domain {
    private conn: any;
    private loadingWindow: BrowserWindow;
    private appWindow: BrowserWindow;
    private state: IDomainState;

    constructor(opts: IDomainOptions) {
        this.conn = createConnection(opts.dbPath);
        this.loadingWindow = opts.loadingWindow;
        this.appWindow = opts.appWindow;
        this.state = {
            firstRun: false,
            now: new Date(),
        };
    }

    public async init() {
        debug('init app');
        this.loadingWindow.loadURL('http://localhost:2442/loading');
        this.loadingWindow.webContents.on('did-finish-load', () => this.loadingWindow.show());

        this.emitLoading('loading_status', { message: 'Checking Database', isFinished: false });
        await this.testDB();
        debug('tests ok');
        this.emitLoading('loading_status', { message: 'Loading App', isFinished: false });

        const isFirstRun = store.get('firstRun', true);
        if (isFirstRun) {
            // run initial setup, etc
            store.set('firstRun', false);
        }
        debug('creating windows');

        // build querystring for app mounting
        this.appWindow.loadURL(`http://localhost:2442/app`);
        this.appWindow.setTitle('R6DB');
        this.appWindow.webContents.on('did-finish-load', async () => {
            this.emitLoading('loading_status', { message: 'Starting', isFinished: true });
            this.emit('state', { isFirstRun });
            // hardcode this until we sent a trigger from the app
            await delay(2000);
            this.updateState(state => {
                state.now = new Date();
            });
            this.loadingWindow.destroy();
            this.appWindow.show();
            if (!IS_PROD) {
                this.appWindow.webContents.openDevTools();
            }
        });
    }

    private async testDB() {
        try {
            const conn = await this.conn;
            const res = await conn.query('SELECT 1 + 1');
            debug('testing db', { successful: true, res });
            return true;
        } catch (err) {
            debug('testing db', { successful: false, err });
            throw err;
        }
    }

    /**
     * update the state (see https://github.com/mweststrate/immer for docu)
     * and publish the changes to the app
     */
    private updateState(updater: (draft: IDomainState) => any) {
        this.state = produce(this.state, updater, patches => {
            this.emit('patch', patches);
        });
    }

    /**
     * emit an event to the app window
     */
    private emit(event, ...data: any[]) {
        if (this.appWindow && !this.appWindow.isDestroyed()) {
            debug('emit', event, data);
            this.appWindow.webContents.send(event, ...data);
        }
    }

    /**
     * emit an event to the loading window
     */
    private emitLoading(event, ...data: any[]) {
        if (this.loadingWindow && !this.loadingWindow.isDestroyed()) {
            debug('emit to loading', event, data);
            this.loadingWindow.webContents.send(event, ...data);
        }
    }
}
