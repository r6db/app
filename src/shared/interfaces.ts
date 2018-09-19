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
    auth: {
        email: string;
        password: string;
        remember: boolean;
        loginState: 'initial' | 'pending' | 'authed' | 'error';
    };
}

export interface ILoginOpts {
    email: string;
    password: string;
    remember: boolean;
}

// TODO: define message interfaces

export interface IBaseMessage {
    type: string;
}
interface IDummyMessage extends IBaseMessage {
    type: 'dummy';
    payload: any;
}

export type MessageType = IBaseMessage | IDummyMessage;
