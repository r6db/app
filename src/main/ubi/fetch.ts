import nodeFetch, { Response, RequestInit } from 'node-fetch';
import { merge } from 'lodash';

import * as Bluebird from 'bluebird';
import {
    TooManyRequestsError,
    BadRequestError,
    MissingHeaderError,
    MissingCredentialsError,
    InvalidCredentialsError,
    UnknownError,
    UnknownAuthorizationError,
} from '../errors/ubiErrors';

/**
 * do a fetch
 */

export const fetch = <T>(url: string, params: Partial<RequestInit> = {}) => async (token: string): Promise<T> => {
    return Bluebird.attempt(async () => {
        const opts: RequestInit = merge(
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

        const res = await nodeFetch(url, opts);

        if (res.status !== 200) {
            return processErrorResponse(res);
        }

        return res.json();
    }).timeout(10000);
};

interface IErrorResponse {
    httpCode: number;
    errorCode: number;
    message: string;
}

const processErrorResponse = async (res: Response) => {
    const body: string = await res.text();
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
            case 3:
                throw new InvalidCredentialsError();
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
