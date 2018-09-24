import { IPolyImage } from 'renderer/interfaces';
import { IL } from 'redux-first-router';
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

export interface IBackgroundReducerState {
    animate: boolean;
    image: IPolyImage;
    filter: string;
    spring: { tension: number; friction: number };
}
export interface ILocaleReducerState {
    selectedLocale: string;
}
// incomplete copy of redux-first-router types
// there's more in the state, but we don't need it
export interface ILocationReducerState {
    type: string;
    query?: any;
    payload: any;
    search: string;
    prev: {
        type: string;
        payload: any;
    };
}

export interface ISettingsReducerState {
    animations: boolean;
}

export interface IStore {
    auth: IAuthReducerState;
    background: IBackgroundReducerState;
    loading: boolean;
    locale: ILocaleReducerState;
    location: ILocationReducerState;
    settings: ISettingsReducerState;
}
