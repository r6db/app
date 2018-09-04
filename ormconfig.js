module.exports = {
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: ['src/main/db/entities/*.ts'],
    migrations: ['src/main/db/migrations/*.ts'],
    cli: {
        entitiesDir: 'src/main/db/entities',
        migrationsDir: 'src/main/db/migrations',
    },
};
