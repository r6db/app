import { delay } from 'bluebird';
import produce from 'immer';
import { IStore, IDomainOptions, IDomainState, ILoginOpts } from 'shared/interfaces';
import { createConnection } from '../db';
import * as ubi from '../ubi';
import makeDebug from 'debug';
const debug = makeDebug('r6db:domain');

const IS_PROD = process.env.NODE_ENV === 'production';

export class Domain {
    private conn: any;
    private state: IDomainState;
    private store: IStore;

    constructor(opts: IDomainOptions) {
        this.conn = createConnection(opts.dbPath);
        this.store = opts.store;
        this.state = {
            firstRun: this.store.get<boolean, boolean>('firstRun', true),
            auth: {
                loginState: 'initial',
                email: this.store.get<string, string>('email', ''),
                password: this.store.get<string, string>('password', ''),
                remember: this.store.get<boolean, boolean>('remember', false),
            },
        };

        debug('startup state', this.state);

        this.store.set('firstRun', false);

        this.updateState = this.updateState.bind(this);
    }

    public async init() {
        if (this.state.auth.email && this.state.auth.password) {
            debug('found stored credentials.. logging in');
            await this.login(this.state.auth);
        }
    }
    public async destroy() {
        if (!this.state.auth.remember) {
            this.store.set('auth.token', '');
        }
    }

    public getState() {
        return this.state;
    }

    public async login(opts: ILoginOpts) {
        this.store.set('email', opts.email);
        if (opts.remember) {
            debug('remembering', opts.email);
            this.store.set('remember', true);
            this.store.set('email', opts.email);
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
                draft.auth.loginState = 'authed';
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
        this.state = produce(this.state, updater);
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
}
