import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserTeamModule } from './user-team/user-team.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    TeamModule,
    AuthModule,
    UserTeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
