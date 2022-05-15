import { Test, TestingModule } from '@nestjs/testing';
import { UserTeam } from '../../user-team/entity/user-team.entity';
import { User } from '../../user/entity/user.entity';
import { UserTeamRepository } from '../../user-team/entity/user-team.repository';
import { UserTeamService } from '../../user-team/user-team.service';
import { UserRepository } from '../../user/entity/user.repository';
import { UserService } from '../../user/user.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Team } from '../entity/team.entity';
import { TeamRepository } from '../entity/team.repository';
import { TeamController } from '../team.controller';
import { TeamService } from '../team.service';
import { DeleteResult } from 'typeorm';

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

  describe('TeamController 팀 참가', () => {
    it('팀 참가 실패(Save UserTeam Error)', async () => {
      jest.spyOn(service, 'joinTeam').mockRejectedValue(new Error('error'));

      try {
        await controller.joinOrLeaveTeam(19, true, 1);
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 참가 성공', async () => {
      jest.spyOn(service, 'joinTeam').mockResolvedValue(undefined);

      const result = await controller.joinOrLeaveTeam(19, true, 1);
      expect(result).toBeUndefined();
    });
  });

  describe('TeamController 팀 탈퇴', () => {
    it('팀 탈퇴 실패(Delete UserTeam Error)', async () => {
      jest.spyOn(service, 'leaveTeam').mockRejectedValue(new Error('error'));

      try {
        await controller.joinOrLeaveTeam(19, false, 1);
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 탈퇴 성공', async () => {
      jest.spyOn(service, 'leaveTeam').mockResolvedValue(undefined);

      const result = await controller.joinOrLeaveTeam(19, false, 1);
      expect(result).toBeUndefined();
    });
  });

  describe('TeamController 팀명 수정', () => {
    it('팀명 수정 실패(Save Team Error)', async () => {
      jest
        .spyOn(service, 'updateTeamName')
        .mockRejectedValue(new Error('error'));

      const updateTeam = new UpdateTeamDto({ teamName: 'update' });

      try {
        await controller.updateTeamName(19, updateTeam);
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀명 수정 성공', async () => {
      jest.spyOn(service, 'updateTeamName').mockResolvedValue(undefined);

      const updateTeam = new UpdateTeamDto({ teamName: 'update' });

      const result = await controller.updateTeamName(19, updateTeam);
      expect(result).toBeUndefined();
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
      jest.spyOn(service, 'deleteTeam').mockResolvedValue(undefined);

      const result = await controller.deleteTeam(19);
      expect(result).toBeUndefined();
    });
  });
});
