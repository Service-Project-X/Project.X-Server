import { Injectable } from '@nestjs/common';
import { UserTeam } from './entity/user-team.entity';
import { UserTeamRepository } from './entity/user-team.repository';

@Injectable()
export class UserTeamService {
  constructor(private readonly userTeamRepository: UserTeamRepository) {}

  async save(partial: Partial<UserTeam>): Promise<UserTeam> {
    return await this.userTeamRepository.save(new UserTeam(partial));
  }
}
