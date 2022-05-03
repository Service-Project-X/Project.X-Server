import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './entity/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [TypeOrmModule.forFeature([User]), UserRepository],
})
export class UserModule {}
