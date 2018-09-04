import { ILoginOpts } from 'shared/interfaces';
import { Domain } from './index';
import makeDebug from 'debug';
const debug = makeDebug('r6db:domain:listeners');

export function app_login(domain: Domain, opts: ILoginOpts) {
    if (opts.password && opts.email) {
        domain.login(opts);
    }
    debug('app_login', opts);
}
