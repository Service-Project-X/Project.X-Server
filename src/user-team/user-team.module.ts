import { Module } from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { UserTeamController } from './user-team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeam } from './entity/user-team.entity';
import { UserTeamRepository } from './entity/user-team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeam])],
  providers: [UserTeamService, UserTeamRepository],
  controllers: [UserTeamController],
  exports: [UserTeamService],
})
export class UserTeamModule {}
