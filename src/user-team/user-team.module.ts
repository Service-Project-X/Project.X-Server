import { Module } from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { UserTeamController } from './user-team.controller';

@Module({
  providers: [UserTeamService],
  controllers: [UserTeamController]
})
export class UserTeamModule {}
