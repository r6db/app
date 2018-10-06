import { fetch } from './fetch';
import { LOGIN_URL } from './ubicontants';

import { UnknownAuthorizationError } from './errors/ubiErrors';
import { UUID } from '@r6db/interfaces';
import makeDebug from 'debug';
import { IStore } from '.';
const debug = makeDebug('r6db:ubi:auth');

export interface IAuthResponse {
    token: string;
    ticket: string;
    twoFactorAuthenticationTicket: null | string;
    expiration: string;
    platformType: 'uplay' | 'psn' | 'xbl';
    profileId: UUID;
    userId: UUID;
    username: string;
    nameOnPlatform: string;
    initializeUser: boolean;
    spaceId: UUID;
    environment: string;
    hasAcceptedLegalOptins: boolean;
    accountIssues: null;
    sessionId: UUID;
    clientIp: string;
    clientIpCountry: string;
    serverTime: string;
    rememberMeTicket: string;
}

const credentials = {
    email: '',
    password: '',
};

let STORE: IStore;
let LOGIN_TIMEOUT: any;
// store key to save token in
const AUTH_TOKEN = 'auth.token';

export function setCredentials(email: string, password: string) {
    credentials.email = email;
    credentials.password = password;
}

export async function login(creds: typeof credentials, store: IStore) {
    STORE = store;
    // then check the store
    const lastAuth = store.get<IAuthResponse | null>(AUTH_TOKEN, null);
    if (lastAuth && getExpiration(lastAuth) > 0) {
        debug('has valid stored auth');
        setNextLogin(lastAuth);
        return lastAuth;
    }

    // otherwise actually attempt to login
    if (!creds.email || !creds.password) {
        throw new Error('No email or password provided');
    }
    debug('logging in');
    const signInToken = 'Basic ' + new (Buffer as any)(creds.email + ':' + creds.password, 'utf8').toString('base64');
    return fetch<IAuthResponse>(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({ rememberMe: true }),
    })(signInToken)
        .then(res => {
            debug('response successful');
            if (res && res.expiration && res.ticket) {
                debug('New auth expires at ' + res.expiration);
                debug('saving auth response to store');
                store.set(AUTH_TOKEN, res);
                return res;
            } else {
                throw new UnknownAuthorizationError('No response from login: ' + JSON.stringify(res));
            }
        })
        .catch(err => {
            debug('response not successful', err);
            // clear timeout and re-throw to be handled downstream
            clearTimeout(LOGIN_TIMEOUT);
            console.error(err);
            throw err;
        });
}

async function setNextLogin(auth: IAuthResponse) {
    LOGIN_TIMEOUT = setTimeout(() => {
        login(credentials, STORE);
    }, getExpiration(auth));
}

function getExpiration(auth: IAuthResponse): number {
    return new Date(auth.expiration).getTime() - new Date().getTime() - 10 * 60 * 1000;
}

export async function getToken(): Promise<string> {
    const lastAuth = STORE.get<IAuthResponse | null>(AUTH_TOKEN, null);
    if (lastAuth && getExpiration(lastAuth) > 0) {
        return 'Ubi_v1 t=' + lastAuth.ticket;
    }
    const auth: IAuthResponse = await login(credentials, STORE);
    return 'Ubi_v1 t=' + auth.ticket;
}
