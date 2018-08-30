import nodeFetch, { RequestInit, Response } from 'node-fetch';
import { merge } from 'lodash';
import {
    TooManyRequestsError,
    BadRequestError,
    MissingHeaderError,
    MissingCredentialsError,
    UnknownError,
    UnknownAuthorizationError,
} from '../errors/ubiErrors';
import makeDebug from 'debug';
const debug = makeDebug('r6db:ubi:fetch');

// resolve a promise after <ms>. if reject is true, reject instead
async function delay(ms: number, reject = false) {
    return new Promise((res, rej) => {
        setTimeout(reject ? rej : res, ms);
    });
}

/**
 * prepare a request to fire against ubi's api
 * it will return a function that actually runs it
 */
export const fetch = <T>(url: string, params: Partial<RequestInit> = {}) => async (token: string): Promise<T> => {
    const doFetch = async () => {
        const opts = merge(
            {},
            {
                method: 'GET',
                headers: {
                    'Ubi-AppId': '39baebad-39e5-4552-8c25-2c9b919064e2',
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: token,
                },
            },
            params,
        );
        debug('fetching', url);
        const res = await nodeFetch(url, opts);

        if (res.status !== 200) {
            return processErrorResponse(res);
        }

        debug('parsing response');
        return res.json();
    };
    return Promise.race([doFetch(), delay(10000, true)]);
};

interface IErrorResponse {
    httpCode: number;
    errorCode: number;
    message: string;
}

const processErrorResponse = async (res: Response) => {
    const body: string = await res.text();
    debug('parsing error', body);
    try {
        const json: IErrorResponse = JSON.parse(body);
        switch (json.httpCode) {
            case 429:
                throw new TooManyRequestsError();
            case 400:
                throw new BadRequestError(json.message || json.errorCode);
            default:
                break;
        }
        switch (json.errorCode) {
            case 1:
                throw new MissingHeaderError();
            case 2:
                throw new MissingCredentialsError();
            case 3:
                throw new MissingHeaderError();
            // this is also 3 ?
            // case 3:
            //     throw new InvalidCredentialsError();
            case 1101:
                throw new TooManyRequestsError();
            case 1100:
                throw new TooManyRequestsError();
            default:
                throw new UnknownAuthorizationError(json.message || json.errorCode);
        }
    } catch (e) {
        throw new UnknownError(body);
    }
};
