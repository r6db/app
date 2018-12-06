module.exports = {
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: ['src/db/entities/*.ts'],
    migrations: ['src/db/migrations/*.ts'],
    cli: {
        entitiesDir: 'src/db/entities',
        migrationsDir: 'src/db/migrations',
    },
};
