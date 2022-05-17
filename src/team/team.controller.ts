import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
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

  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async joinOrLeaveTeam(
    @UserId() userId: number,
    @Query('whether', ParseBoolPipe) whether: boolean,
    @Query('teamId', ParseIntPipe) teamId: number,
  ): Promise<void> {
    try {
      if (whether) {
        await this.teamService.joinTeam(userId, teamId);
      } else {
        await this.teamService.leaveTeam(userId, teamId);
      }
    } catch (error) {
      if (
        error.message == 'Already Joined' ||
        error.message == 'Fail to find Team' ||
        error.message == 'Not Joined'
      ) {
        throw new BadRequestException(error.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  @Put('/:teamId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async updateTeamName(
    @Param('teamId') teamId: number,
    @Body() updateTeam: UpdateTeamDto,
  ): Promise<void> {
    try {
      await this.teamService.updateTeamName(teamId, updateTeam);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete('/:teamId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteTeam(@Param('teamId') teamId: number): Promise<void> {
    try {
      await this.teamService.deleteTeam(teamId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
