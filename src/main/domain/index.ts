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
            firstRun: this.store.get<boolean, boolean>('firstRun', true),
            routing: {
                page: 'login',
            },
            auth: {
                loginState: 'pending',
                email: this.store.get<string, string>('email', ''),
                password: this.store.get<string, string>('password', ''),
                rememberMail: this.store.get<boolean, boolean>('rememberMail', false),
                rememberPass: this.store.get<boolean, boolean>('rememberPass', false),
            },
        };

        debug('startup state', this.state);

        this.store.set('firstRun', false);

        if (this.state.auth.email && this.state.auth.password) {
            debug('found stored credentials.. logging in');
            this.login(this.state.auth);
        }

        this.emit = this.emit.bind(this);
        this.emitLoading = this.emitLoading.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    public async init() {
        debug('init app');
        // TODO: change port in DEV (for webpack-dev-server)
        this.loadingWindow.loadURL('http://localhost:2442/loading');
        this.loadingWindow.webContents.on('did-finish-load', () => this.loadingWindow.show());

        this.emitLoading('loading_status', { message: 'Checking Database', isFinished: false });
        await this.testDB();
        debug('tests ok');
        this.emitLoading('loading_status', { message: 'Loading App', isFinished: false });

        debug('creating windows');

        // build querystring for app mounting
        // TODO: change port in DEV (for webpack-dev-server)
        this.appWindow.loadURL(`http://localhost:2442`);
        this.appWindow.setTitle('R6DB');
        this.appWindow.webContents.on('did-finish-load', async () => {
            this.emitLoading('loading_status', { message: 'Starting', isFinished: true });
            this.emit('state', this.state);
            // hardcode this until we sent a trigger from the app
            this.loadingWindow.destroy();
            this.appWindow.show();
            if (!IS_PROD) {
                this.appWindow.webContents.openDevTools();
            }
        });
        // attach emitters
        // TODO: accept both websocket and IPC
        Object.keys(listeners).map(key => {
            debug('attaching event', key);
            this.appEmitter.on(key, (event, arg) => {
                debug('received event', { event, arg });
                listeners[key](this, arg);
            });
        });
    }
    public async destroy() {
        if (!this.state.auth.rememberMail && !this.state.auth.rememberPass) {
            this.store.set('auth.token', '');
        }
    }

    public async login(opts: ILoginOpts) {
        if (opts.rememberMail) {
            debug('remembering email', opts.email);
            this.store.set('rememberMail', true);
            this.store.set('email', opts.email);
        }
        if (opts.rememberPass) {
            debug('remembering password');
            this.store.set('rememberPass', true);
            this.store.set('password', opts.password);
        }
        this.updateState(draft => {
            draft.auth = { ...opts, loginState: 'pending' };
            draft.user = undefined;
        });
        ubi.setCredentials(opts.email, opts.password);
        try {
            const res = await ubi.login(opts);
            this.updateState(draft => {
                draft.user = {
                    profileId: res.profileId,
                    name: res.nameOnPlatform,
                };
                draft.auth.loginState = 'success';
            });
            return res;
        } catch (e) {
            this.updateState(draft => {
                draft.auth.loginState = 'error';
            });
            return Promise.reject(e);
        }
    }

    /**
     * update the state (see https://github.com/mweststrate/immer for docu)
     * and publish the changes to the app
     */
    public updateState(updater: (draft: IDomainState) => any) {
        this.state = produce(this.state, updater, patches => {
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
            debug('emit', event);
            this.appWindow.webContents.send(event, ...data);
        }
    }

    /**
     * emit an event to the loading window
     */
    private emitLoading(event, ...data: any[]) {
        if (this.loadingWindow && !this.loadingWindow.isDestroyed()) {
            debug('emit to loading', event);
            this.loadingWindow.webContents.send(event, ...data);
        }
    }
}
