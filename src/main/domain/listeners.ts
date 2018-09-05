import { ILoginOpts } from 'shared/interfaces';
import { Domain } from './index';
import makeDebug from 'debug';
const debug = makeDebug('r6db:domain:listeners');

export function app_login(domain: Domain, opts: ILoginOpts) {
    if (opts.password && opts.email) {
        domain.login(opts);
        // TODO: check login return value
        domain.updateState(draft => {
            draft.auth.loginState = 'success';
            draft.routing.page = 'home';
            draft.routing.params = null;
        });
    }
}

export function app_logout(domain: Domain) {
    domain.updateState(draft => {
        draft.auth.loginState = 'pending';
        draft.routing.page = 'login';
        draft.routing.params = null;
    });
}
