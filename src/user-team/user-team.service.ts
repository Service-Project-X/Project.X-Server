import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserTeam } from './entity/user-team.entity';
import { UserTeamRepository } from './entity/user-team.repository';

@Injectable()
export class UserTeamService {
  constructor(private readonly userTeamRepository: UserTeamRepository) {}

  async save(partial: Partial<UserTeam>): Promise<UserTeam> {
    try {
      return await this.userTeamRepository.save(new UserTeam(partial));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteWithUserIdAndTeamId(
    userId: number,
    teamId: number,
  ): Promise<DeleteResult> {
    try {
      return await this.userTeamRepository.deleteWithUserIdAndTeamId(
        userId,
        teamId,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
