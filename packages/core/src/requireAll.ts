import * as fs from 'fs';
import { resolve } from 'path';
import makeDebug from 'debug';

const debug = makeDebug('r6db:core:requireAll');

export function requireAll(dir: string, filter: RegExp = /.js$/) {
    debug('given path', { path: dir });
    const stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        throw new Error('dir is not a directory');
    }
    const files = fs.readdirSync(dir).filter(fileName => filter.test(fileName));
    debug('found files', { dir, files });
    return files.reduce(
        (acc, file: string) => {
            acc[file] = require(resolve(__dirname, dir, file));
            return acc;
        },
        {} as any,
    );
}
