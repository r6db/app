import { createConnection, ConnectionOptions } from 'typeorm';
const path = require('path');
const { app } = require('electron');

import * as connectionInfo from '../../ormconfig.js';

const config = Object.assign({}, connectionInfo as ConnectionOptions, {
    database: path.resolve(app.getPath('documents'), 'r6db/data.sqlite'),
});

createConnection(config)
    .then(async conn => {
        const res = await conn.query('SELECT 1+1');
        console.log('connected to db', res);
        process.exit(0);
    })
    .catch(console.error);
