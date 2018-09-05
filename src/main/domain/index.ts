import { BrowserWindow, IpcMain } from 'electron';
import { delay } from 'bluebird';
import produce from 'immer';
import { IStore, IDomainOptions, IDomainState, ILoginOpts } from 'shared/interfaces';
import { createConnection } from '../db';
import * as ubi from '../ubi';
import * as listeners from './listeners';
import makeDebug from 'debug';
const debug = makeDebug('r6db:domain');

const IS_PROD = process.env.NODE_ENV === 'production';

export class Domain {
    private conn: any;
    private loadingWindow: BrowserWindow;
    private appWindow: BrowserWindow;
    private appEmitter: IpcMain;
    private state: IDomainState;
    private store: IStore;

    constructor(opts: IDomainOptions) {
        this.conn = createConnection(opts.dbPath);
        this.loadingWindow = opts.loadingWindow;
        this.appWindow = opts.appWindow;
        this.store = opts.store;
        this.appEmitter = opts.appEmitter;
        this.state = {
            firstRun: false,
            now: new Date(),
            routing: {
                page: 'login',
                params: null,
            },
            auth: {
                loginState: 'pending',
                email: this.store.get<string, string>('email', ''),
                password: this.store.get<string, string>('password', ''),
                rememberMail: this.store.get<boolean, boolean>('rememberMail', false),
                rememberPass: this.store.get<boolean, boolean>('rememberPass', false),
            },
        };

        this.emit = this.emit.bind(this);
        this.emitLoading = this.emitLoading.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    public async init() {
        debug('init app');
        this.loadingWindow.loadURL('http://localhost:2442/loading');
        this.loadingWindow.webContents.on('did-finish-load', () => this.loadingWindow.show());

        this.emitLoading('loading_status', { message: 'Checking Database', isFinished: false });
        await this.testDB();
        debug('tests ok');
        this.emitLoading('loading_status', { message: 'Loading App', isFinished: false });

        const isFirstRun = this.store.get('firstRun', true);
        if (isFirstRun) {
            // run initial setup, etc
            this.store.set('firstRun', false);
        }
        debug('creating windows');

        // build querystring for app mounting
        this.appWindow.loadURL(`http://localhost:2442/app`);
        this.appWindow.setTitle('R6DB');
        this.appWindow.webContents.on('did-finish-load', async () => {
            this.emitLoading('loading_status', { message: 'Starting', isFinished: true });
            this.emit('state', this.state);
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
        // attach emitters
        Object.keys(listeners).map(key => {
            debug('attaching event', key);
            this.appEmitter.on(key, (event, arg) => {
                debug('received event', { event, arg });
                listeners[key](this, arg);
            });
        });
    }
    public login(opts: ILoginOpts) {
        if (opts.rememberMail) {
            this.store.set('rememberMail', true);
            this.store.set('email', opts.email);
        }
        if (opts.rememberPass) {
            this.store.set('rememberPass', true);
            this.store.set('password', opts.password);
        }
        ubi.setCredentials(opts.email, opts.password);
    }

    /**
     * update the state (see https://github.com/mweststrate/immer for docu)
     * and publish the changes to the app
     */
    public updateState(updater: (draft: IDomainState) => any) {
        this.state = produce(this.state, updater, patches => {
            debug('state updated', patches);
            this.emit('patch', patches);
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
