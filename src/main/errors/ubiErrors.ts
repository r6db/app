// tslint:disable:max-classes-per-file
import { OurError } from './baseError';

export abstract class UbiError extends OurError {
    constructor(message: string) {
        super('UbiError', message);
    }
}

export class UnknownAuthorizationError extends UbiError {
    constructor(message: string | number) {
        super('Unknown Authorization Error: ' + message);
    }
}

export class TooManyRequestsError extends UbiError {
    constructor() {
        super('Too many requests');
    }
}

export class BadRequestError extends UbiError {
    constructor(message: string | number) {
        super('Bad Request: ' + message);
    }
}

export class MissingHeaderError extends UbiError {
    constructor() {
        super('Missing header');
    }
}

export class MissingCredentialsError extends UbiError {
    constructor() {
        super('Missing credentials');
    }
}

export class InvalidCredentialsError extends UbiError {
    constructor() {
        super('Invalid credentials');
    }
}

export class UnknownError extends UbiError {
    constructor(message: string) {
        super('Unknown Ubi Error: ' + message);
    }
}

export class TooManyIdsError extends UbiError {}
