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
    store: IStore;
}

export interface IDomainState {
    firstRun: boolean;
    user?: {
        profileId: UUID;
        name: string;
    };
    auth: IAuthReducerState;
}

export interface ILoginOpts {
    email: string;
    password: string;
    remember: boolean;
}

export interface IAuthReducerState {
    email: string;
    password: string;
    remember: boolean;
    loginState: 'initial' | 'pending' | 'authed' | 'error';
    error: string | null;
}
