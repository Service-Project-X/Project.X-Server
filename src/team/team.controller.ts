import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserId } from '../global/decorators/userId.decorator';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entity/team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTeam(
    @UserId() userId: number,
    @Body() createTeam: CreateTeamDto,
  ): Promise<Team> {
    try {
      return await this.teamService.createTeam(userId, createTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Put('/:teamId')
  @UseGuards(JwtAuthGuard)
  async updateTeamName(
    @Param('teamId') teamId: number,
    @Body() updateTeam: UpdateTeamDto,
  ): Promise<string> {
    try {
      return await this.teamService.updateTeamName(teamId, updateTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete('/:teamId')
  @UseGuards(JwtAuthGuard)
  async deleteTeam(@Param('teamId') teamId: number): Promise<string> {
    try {
      return await this.teamService.deleteTeam(teamId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
