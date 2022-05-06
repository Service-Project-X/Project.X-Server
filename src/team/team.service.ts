import { Injectable } from '@nestjs/common';
import { UserTeam } from '../user-team/entity/user-team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';
import { TeamRepository } from './entity/team.repository';
import { UserService } from '../user/user.service';
import { UserTeamService } from '../user-team/user-team.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: TeamRepository,
    private readonly userService: UserService,
    private readonly userTeamService: UserTeamService,
  ) {}
  async findOne(teamId: number): Promise<Team> {
    return await this.teamRepository.findOne(teamId);
  }

  async save(partial: Partial<Team>): Promise<Team> {
    return await this.teamRepository.save(new Team(partial));
  }

  async updateTeam(teamId: number, updateTeam: UpdateTeamDto) {
    return await this.teamRepository.update(teamId, updateTeam);
  }

  async deleteTeam(teamId: number) {
    return await this.teamRepository.delete(teamId);
  }

  async createTeam(userId: number, createTeam: CreateTeamDto) {
    const team: Team = new Team({
      teamName: createTeam.teamName,
      userTeams: [],
    });
    const createdTeam: Team = await this.save(team);

    const userTeam = new UserTeam({
      user: await this.userService.findOne(userId, null),
      team: createdTeam,
    });
    await this.userTeamService.save(userTeam);

    return createdTeam;
  }
}
