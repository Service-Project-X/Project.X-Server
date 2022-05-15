import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 3306;
const DATABASE_USER = process.env.DATABASE_USER || 'project.x';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'project.x';
const DATABASE_NAME = process.env.DATABASE_NAME || 'ProjectX';

const TYPEORM: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: ['./dist/**/*.entity.js'],
};

export { NODE_ENV, TYPEORM };
