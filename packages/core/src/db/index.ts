import { createConnection as connect, ConnectionOptions } from 'typeorm';
import makeDebug from 'debug';
const debug = makeDebug('r6db:main:db');

function getExport(module) {
    return Object.keys(module)
        .filter(x => x !== 'default')
        .reduce((_, key) => module[key], null);
}

export async function createConnection(path) {
    debug('create connection to', path);
    const entityRequire = (require as any).context('./entities', false, /.ts$/);
    const entities = entityRequire
        .keys()
        .sort()
        .reduce((acc, key) => {
            const e = getExport(entityRequire(key));
            debug('loading entity', e.name);
            return acc.concat(e);
        }, []);

    const migrationRequire = (require as any).context('./migrations', false, /.ts$/);
    const migrations = migrationRequire
        .keys()
        .sort()
        .reduce((acc, key) => {
            const e = getExport(migrationRequire(key));
            debug('loading migration', e.name);
            return acc.concat(e);
        }, []);

    const config: ConnectionOptions = {
        type: 'sqlite',
        migrations,
        entities,
        logger: 'debug',
        logging: 'query',
        database: path,
    } as any;

    const conn = await connect(config);
    debug('running pending migrations');
    await conn.runMigrations({
        transaction: true,
    });
    return conn;
}
