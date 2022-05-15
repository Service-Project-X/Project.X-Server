import { Injectable } from '@nestjs/common';
import { UserTeam } from '../user-team/entity/user-team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';
import { TeamRepository } from './entity/team.repository';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
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

  async update(teamId: number, updateTeam: UpdateTeamDto): Promise<void> {
    const updateResult: UpdateResult = await this.teamRepository.update(
      teamId,
      new Team(updateTeam),
    );
    if (updateResult.affected == 0) {
      throw new Error('Fail to Change Team Name');
    }
  }

  async delete(teamId: number): Promise<void> {
    const deleteResult: DeleteResult = await this.teamRepository.delete(teamId);
    if (deleteResult.affected == 0) {
      throw new Error('Fail to delete Team');
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
  ): Promise<void> {
    try {
      await this.update(teamId, updateTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async joinTeam(userId: number, teamId: number): Promise<void> {
    try {
      // 테스트 코드 추가하기?
      await this.isExistTeam(teamId);
      if (await this.isAlreadyJoined(userId, teamId)) {
        throw new Error('Already Joined');
      }

      const foundUser: User = await this.userService.findOne(userId);
      const foundTeam: Team = await this.teamRepository.findOne(teamId);

      await this.userTeamService.save(
        new UserTeam({
          user: foundUser,
          team: foundTeam,
        }),
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async isExistTeam(teamId: number): Promise<void> {
    try {
      const team = await this.teamRepository.findOne(teamId);
      if (typeof team == 'undefined') {
        throw new Error('Fail to find Team');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async isAlreadyJoined(
    userId: number,
    teamId: number,
  ): Promise<boolean> {
    try {
      const result = await this.userTeamService.findOneWithUserIdAndTeamId(
        userId,
        teamId,
      );
      return typeof result !== 'undefined' ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async leaveTeam(userId: number, teamId: number): Promise<void> {
    try {
      await this.isExistTeam(teamId);
      if (!(await this.isAlreadyJoined(userId, teamId))) {
        throw new Error('Not Joined');
      }

      await this.userTeamService.deleteWithUserIdAndTeamId(userId, teamId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTeam(teamId: number): Promise<void> {
    try {
      await this.delete(teamId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
