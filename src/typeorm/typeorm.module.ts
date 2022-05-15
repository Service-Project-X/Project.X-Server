import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TYPEORM } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM,
      migrations: [
        process.env.NODE_ENV === 'production'
          ? join(__dirname, '../dist/migrations/*{.ts,.js}')
          : join(__dirname, '/migrations/*{.ts,.js}'),
      ],
      cli: {
        migrationsDir: 'migration',
      },
    }),
  ],
})
export class TypeormModule {}
