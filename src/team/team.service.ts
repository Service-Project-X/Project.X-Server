import { Injectable } from '@nestjs/common';
import { UserTeam } from '../user-team/entity/user-team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entity/team.entity';
import { TeamRepository } from './entity/team.repository';
import { UserService } from '../user/user.service';
import { UserTeamService } from '../user-team/user-team.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: TeamRepository,
    private readonly userService: UserService,
    private readonly userTeamService: UserTeamService,
  ) {}
  async findOne(teamId: number): Promise<Team> {
    try {
      return await this.teamRepository.findOne(teamId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async save(partial: Partial<Team>): Promise<Team> {
    try {
      return await this.teamRepository.save(new Team(partial));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(
    teamId: number,
    updateTeam: UpdateTeamDto,
  ): Promise<UpdateResult> {
    try {
      return await this.teamRepository.update(teamId, updateTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(teamId: number): Promise<DeleteResult> {
    try {
      return await this.teamRepository.delete(teamId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createTeam(userId: number, createTeam: CreateTeamDto) {
    try {
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
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTeamName(teamId: number, updateTeam: UpdateTeamDto) {
    try {
      await this.update(teamId, updateTeam);
      return 'Team name updated successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
