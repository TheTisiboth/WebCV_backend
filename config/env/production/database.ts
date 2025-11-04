// path: ./config/env/production/database.ts

export default ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            connectionString: env('DATABASE_URL'),
            ssl: false
        },
        pool: {
            min: 2,
            max: 10
        },
    },
    debug: false,
});
