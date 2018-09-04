import { BrowserWindow, IpcMain } from 'electron';
export type UUID = string;

export interface IStore {
    get<T, S>(key: string, defaultValue?: S): T | S;
    set<T>(key: string, value: T);
    has(key: string): boolean;
}
export interface IDomainOptions {
    // path to sqlite db
    dbPath: string;
    appWindow: BrowserWindow;
    appEmitter: IpcMain;
    loadingWindow: BrowserWindow;
    store: IStore;
}

export interface IDomainState {
    firstRun: boolean;
    now: Date;
    routing: {
        page: 'login';
        params: any;
    };
    auth: {
        email: string;
        password: string;
        rememberMail: boolean;
        rememberPass: boolean;
        loginState: 'pending' | 'success' | 'error';
    };
}

export interface ILoginOpts {
    email: string;
    password: string;
    rememberMail: boolean;
    rememberPass: boolean;
}
