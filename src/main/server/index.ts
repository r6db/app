import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import produce from 'immer';
import * as serveStatic from 'serve-static';
import makeDebug from 'debug';
import { Domain } from 'main/domain';
import { makeAuthController } from './AuthController';
const debug = makeDebug('r6db:main');

interface IServerOptions {
    staticFiles?: boolean;
    port: number;
}
export function makeServer(domain: Domain, opts: IServerOptions) {
    return new Promise(resolve => {
        const app = (express as any).default();

        if (opts.staticFiles) {
            // the path is just `../`, because after building the entire script is held in main/index.js
            app.use((serveStatic as any).default(path.resolve(__dirname, '../')));
        }
        // add body parser
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // fugly, but works
        app.get('/api/state', (_, res) => {
            res.json(
                produce(domain.getState(), draft => {
                    // sanitize output
                    draft.auth.password = '';
                }),
            );
        });
        // mount controller
        app.use('/api/auth', makeAuthController(domain));

        app.listen(opts.port, () => {
            debug('listening on port', opts.port);
            resolve();
        });
    });
}
