import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';

const app = (express as any).default();

app.use((serveStatic as any).default(path.resolve(__dirname, '..')));

app.listen(2442, () => {
    console.log('listening on port', 2442);
});
