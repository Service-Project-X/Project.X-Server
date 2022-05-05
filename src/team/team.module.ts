import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamModule } from '../user-team/user-team.module';
import { UserModule } from '../user/user.module';
import { Team } from './entity/team.entity';
import { TeamRepository } from './entity/team.repository';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), UserModule, UserTeamModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  exports: [TypeOrmModule.forFeature([Team]), TeamRepository],
})
export class TeamModule {}
