import { Module } from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { UserTeamController } from './user-team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamRepository } from './entity/user-team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeamRepository])],
  providers: [UserTeamService],
  controllers: [UserTeamController],
  exports: [UserTeamService],
})
export class UserTeamModule {}
