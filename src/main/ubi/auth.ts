import { fetch } from './fetch';
import { LOGIN_URL } from './ubicontants';

import { promisify } from 'util';
import * as Bluebird from 'bluebird';

import { UnknownAuthorizationError } from '../errors/ubiErrors';
import { store } from '../store';

const CREDENTIALS = {
    email: '',
    password: '',
};

let CURRENT_LOGIN: Bluebird<any>;
let LOGIN_TIMEOUT: NodeJS.Timer;
let currentAuth: IAuthResponse;

async function login(email?: string, password?: string): Promise<IAuthResponse> {
    if (CURRENT_LOGIN) {
        return CURRENT_LOGIN;
    }
    if (currentAuth) {
        return currentAuth;
    }
    if (email && password) {
        setCredentials(email, password);
    }
    if (!CREDENTIALS.email || !CREDENTIALS.password) {
        throw new Error('No email or password provided');
    }
    CURRENT_LOGIN = Bluebird.attempt(
        async (): Promise<IAuthResponse> => {
            const auth = await readAuthFromFile();
            if (auth) {
                if (getExpiration(auth) > 0) {
                    setNextLogin(auth);
                    return auth;
                }
            }

            const signInToken =
                'Basic ' + new Buffer(CREDENTIALS.email + ':' + CREDENTIALS.password, 'utf8').toString('base64');
            const res: IAuthResponse = await fetch<IAuthResponse>(LOGIN_URL, {
                method: 'POST',
                body: JSON.stringify({ rememberMe: true }),
            })(signInToken);
            if (res && res.expiration && res.ticket) {
                console.debug('New auth expires at ' + res.expiration);
                currentAuth = res;
                await writeAuthFileToFile(res);
                return res;
            } else {
                throw new UnknownAuthorizationError('No response from login: ' + JSON.stringify(res));
            }
        },
    )
        .catch(async e => {
            console.error(e);
            clearTimeout(LOGIN_TIMEOUT);
            LOGIN_TIMEOUT = undefined;
            await Bluebird.delay(5000);
            throw e;
        })
        .finally(() => {
            CURRENT_LOGIN = undefined;
        });
    return CURRENT_LOGIN;
}

async function setNextLogin(auth: IAuthResponse) {
    LOGIN_TIMEOUT = setTimeout(() => {
        login();
    }, getExpiration(auth));
}

function getExpiration(auth: IAuthResponse): number {
    return new Date(auth.expiration).getTime() - new Date().getTime() - 10 * 60 * 1000;
}

type UUID = string;

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

async function readAuthFromFile(): Promise<IAuthResponse | false> {
    try {
        const auth: IAuthResponse = store.get('auth.token', {});
        return auth;
    } catch (e) {
        console.debug('No old token');
    }
    return false;
}

async function writeAuthFileToFile(authData: IAuthResponse) {
    store.set('auth.token', authData);
}

export function setCredentials(email: string, password: string) {
    CREDENTIALS.email = email;
    CREDENTIALS.password = password;
}

export async function getToken(): Promise<string> {
    if (currentAuth && getExpiration(currentAuth) > 0) {
        return currentAuth.ticket;
    }
    const auth: IAuthResponse = await login();
    return 'Ubi_v1 t=' + auth.ticket;
}
