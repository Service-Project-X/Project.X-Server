import { Injectable } from '@nestjs/common';
import { UserTeam } from '../user-team/entity/user-team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';
import { TeamRepository } from './entity/team.repository';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserTeamService } from '../user-team/user-team.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly userService: UserService,
    private readonly userTeamService: UserTeamService,
  ) {}

  async findOne(teamId: number): Promise<Team> {
    const team: Team = await this.teamRepository.findOne(teamId);
    if (typeof team == 'undefined') {
      throw new Error("Can't find Team");
    } else {
      return team;
    }
  }

  async update(teamId: number, updateTeam: UpdateTeamDto): Promise<string> {
    const updateResult: UpdateResult = await this.teamRepository.update(
      teamId,
      new Team(updateTeam),
    );
    if (updateResult.affected == 0) {
      throw new Error('Fail to Change Team Name');
    } else {
      return 'Team name updated successfully';
    }
  }

  async createTeam(userId: number, createTeam: CreateTeamDto): Promise<Team> {
    try {
      const team: Team = new Team({
        teamName: createTeam.teamName,
        userTeams: [],
      });
      const createdTeam: Team = await this.teamRepository.save(new Team(team));

      const userTeam = new UserTeam({
        user: await this.userService.findOne(userId),
        team: createdTeam,
      });
      await this.userTeamService.save(userTeam);

      return createdTeam;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTeamName(
    teamId: number,
    updateTeam: UpdateTeamDto,
  ): Promise<string> {
    try {
      return await this.update(teamId, updateTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async joinTeam(userId: number, teamId: number): Promise<UserTeam> {
    try {
      const foundUser: User = await this.userService.findOne(userId);
      const foundTeam: Team = await this.teamRepository.findOne(teamId);

      return await this.userTeamService.save(
        new UserTeam({
          user: foundUser,
          team: foundTeam,
        }),
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async leaveTeam(userId: number, teamId: number): Promise<string> {
    try {
      await this.userTeamService.deleteWithUserIdAndTeamId(userId, teamId);
      return 'Team left successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTeam(teamId: number): Promise<string> {
    try {
      await this.teamRepository.delete(teamId);
      return 'Team deleted successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
