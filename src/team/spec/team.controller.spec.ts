import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamRepository } from '../../user-team/entity/user-team.repository';
import { UserTeamService } from '../../user-team/user-team.service';
import { UserRepository } from '../../user/entity/user.repository';
import { UserService } from '../../user/user.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Team } from '../entity/team.entity';
import { TeamRepository } from '../entity/team.repository';
import { TeamController } from '../team.controller';
import { TeamService } from '../team.service';

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        TeamService,
        TeamRepository,
        UserService,
        UserRepository,
        UserTeamService,
        UserTeamRepository,
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('TeamController 팀 생성', () => {
    it('팀 생성 실패(Save Team Error)', async () => {
      jest.spyOn(service, 'createTeam').mockRejectedValue(new Error('error'));

      try {
        await controller.createTeam(19, new CreateTeamDto({ teamName: '124' }));
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 생성 성공', async () => {
      const team: Team = new Team({ teamName: '124', userTeams: [] });

      jest.spyOn(service, 'createTeam').mockResolvedValue(team);

      const result = await controller.createTeam(
        19,
        new CreateTeamDto({ teamName: '124' }),
      );
      expect(result).toBe(team);
    });
  });

  describe('TeamController 팀 삭제', () => {
    it('팀 삭제 실패(Delete Team Error)', async () => {
      jest.spyOn(service, 'deleteTeam').mockRejectedValue(new Error('error'));

      try {
        await controller.deleteTeam(19);
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 삭제 성공', async () => {
      jest
        .spyOn(service, 'deleteTeam')
        .mockResolvedValue('Team deleted successfully');

      const result = await controller.deleteTeam(19);
      expect(result).toBe('Team deleted successfully');
    });
  });
});
