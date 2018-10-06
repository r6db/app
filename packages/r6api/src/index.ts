import { login as _login } from './auth';
import { findByName as _findByName } from './commands/findByName';
import { getName as _getName } from './commands/getName';
import { getLevel as _getLevel } from './commands/getLevel';
import { getRanks as _getRanks } from './commands/getRanks';
import { getStats as _getStats } from './commands/getStats';

export interface IStore {
    get<T>(key: string, defaultValue: T): T;
    set<T>(key: string, value: T): void;
    has(key: string): boolean;
}

interface IR6ApiOptions {
    store: IStore;
}

/**
 * mock for a persistent store. don't use this for prod; fors fine for for dev though
 */
const inMemoryStore: IStore = (function() {
    const vals = new Map<string, any>();

    function get<T>(key: string, defaultValue: T): T {
        return vals.has(key) ? vals.get(key) : defaultValue;
    }

    function set<T>(key: string, value: T) {
        vals.set(key, value);
    }
    function has(key: string) {
        return vals.has(key);
    }

    return {
        get,
        set,
        has,
    };
})();

/**
 * the Wrapper for Ubisofts R6:Siege Api
 */
export default class R6Api {
    credentials: any;
    options: Partial<IR6ApiOptions>;
    constructor(options: Partial<IR6ApiOptions> = {}) {
        this.options = options;
    }

    setCredentials(email: string, password: string) {
        this.credentials = { email, password };
    }
    login() {
        return _login(this.credentials, this.options.store || inMemoryStore);
    }
    findByName = _findByName;
    getName = _getName;
    getLevel = _getLevel;
    getRanks = _getRanks;
    getStats = _getStats;
}
