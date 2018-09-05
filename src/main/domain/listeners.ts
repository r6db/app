import { ILoginOpts } from 'shared/interfaces';
import { Domain } from './index';
import makeDebug from 'debug';
import * as ubi from 'main/ubi';
const debug = makeDebug('r6db:domain:listeners');

export function app_login(domain: Domain, opts: ILoginOpts) {
    if (opts.password && opts.email) {
        domain
            .login(opts)
            .then(() => {
                domain.updateState(draft => {
                    draft.routing.page = 'home';
                });
            })
            .catch(err => {
                debug('failed login', err);
            });
    }
}

export function app_logout(domain: Domain) {
    domain.updateState(draft => {
        draft.auth.loginState = 'pending';
        draft.routing.page = 'login';
    });
}
