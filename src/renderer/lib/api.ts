import { ILoginOpts } from 'shared/interfaces';

export function logIn(creds: ILoginOpts) {
    return fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    }).then(res => res.json());
}

export function logOut() {
    return fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    }).then(res => res.json());
}
