import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTeam } from './entity/user-team.entity';
import { UserTeamRepository } from './entity/user-team.repository';

@Injectable()
export class UserTeamService {
  constructor(
    @InjectRepository(UserTeam)
    private readonly userTeamRepository: UserTeamRepository,
  ) {}

  async save(partial: Partial<UserTeam>): Promise<UserTeam> {
    const createUserTeam = new UserTeam({
      id: partial['id'],
      user: partial['user'],
      team: partial['team'],
    });

    try {
      return await this.userTeamRepository.save(createUserTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
