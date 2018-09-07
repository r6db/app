import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';
import makeDebug from 'debug';

const debug = makeDebug('r6db:main');

const app = (express as any).default();

app.use((serveStatic as any).default(path.resolve(__dirname, '..')));

app.listen(2442, () => {
    debug('listening on port', 2442);
});

// TODO: implement rest-y JSON api
// TODO: write socket listener
