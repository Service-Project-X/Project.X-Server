import 'dotenv/config';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  development: {
    type: 'mysql',
    host: process.env.DEVELOPMENT_DATABASE_HOST,
    port: +process.env.DEVELOPMENT_DATABASE_PORT,
    username: process.env.DEVELOPMENT_DATABASE_USER,
    password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: ['./dist/**/*.entity.js'],
    migrations: [
      process.env.NODE_ENV === 'production'
        ? join(__dirname, '../dist/migrations/*{.ts,.js}')
        : join(__dirname, '/migrations/*{.ts,.js}'),
    ],
    cli: {
      migrationsDir: 'migration',
    },
  },
  production: {
    type: 'mysql',
    host: process.env.PRODUCTION_DATABASE_HOST,
    port: +process.env.PRODUCTION_DATABASE_PORT,
    username: process.env.PRODUCTION_DATABASE_USER,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: ['./dist/**/*.entity.js'],
    migrations: [
      process.env.NODE_ENV === 'production'
        ? join(__dirname, '../dist/migrations/*{.ts,.js}')
        : join(__dirname, '/migrations/*{.ts,.js}'),
    ],
    cli: {
      migrationsDir: 'migration',
    },
  },
};

export { connectionOptions };