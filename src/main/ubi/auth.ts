import { fetch } from './fetch';
import { LOGIN_URL } from './ubicontants';

import { UnknownAuthorizationError } from '../errors/ubiErrors';
import { store } from '../store';
import { UUID } from 'shared/interfaces';
import makeDebug from 'debug';
const debug = makeDebug('r6db:ubi:auth');

interface IAuthResponse {
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

let LOGIN_TIMEOUT: NodeJS.Timer;
// in-memory auth;
let currentAuth: IAuthResponse;
// store key to save token in
const AUTH_TOKEN = 'auth.token';

export function setCredentials(email: string, password: string) {
    credentials.email = email;
    credentials.password = password;
}

async function login(creds: typeof credentials) {
    // first check if we have a currently valid auth token
    if (currentAuth) {
        debug('has current auth');
        return currentAuth;
    }
    // then check the store
    const lastAuth = store.get(AUTH_TOKEN, null) as IAuthResponse;
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
    const signInToken = 'Basic ' + new Buffer(creds.email + ':' + creds.password, 'utf8').toString('base64');
    return fetch<IAuthResponse>(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({ rememberMe: true }),
    })(signInToken)
        .then(res => {
            debug('response successful');
            if (res && res.expiration && res.ticket) {
                debug('New auth expires at ' + res.expiration);
                currentAuth = res;
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
        login(credentials);
    }, getExpiration(auth));
}

function getExpiration(auth: IAuthResponse): number {
    return new Date(auth.expiration).getTime() - new Date().getTime() - 10 * 60 * 1000;
}

export async function getToken(): Promise<string> {
    if (currentAuth && getExpiration(currentAuth) > 0) {
        return 'Ubi_v1 t=' + currentAuth.ticket;
    }
    const auth: IAuthResponse = await login(credentials);
    return 'Ubi_v1 t=' + auth.ticket;
}
