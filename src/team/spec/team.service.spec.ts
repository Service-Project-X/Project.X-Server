import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/entity/user.entity';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Team } from '../entity/team.entity';
import { TeamService } from '../team.service';
import { UserTeam } from '../../user-team/entity/user-team.entity';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserService } from '../../user/user.service';
import { UserTeamService } from '../../user-team/user-team.service';
import { TeamRepository } from '../entity/team.repository';
import { UserRepository } from '../../user/entity/user.repository';
import { UserTeamRepository } from '../../user-team/entity/user-team.repository';

describe('TeamService', () => {
  let service: TeamService;
  let teamRepository: TeamRepository;
  let userRepository: UserRepository;
  let userTeamRepository: UserTeamRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        UserService,
        UserTeamService,
        TeamRepository,
        UserRepository,
        UserTeamRepository,
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    teamRepository = module.get<TeamRepository>(TeamRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    userTeamRepository = module.get<UserTeamRepository>(UserTeamRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TeamService 팀 생성', () => {
    it('팀 생성 실패(Save Team Error)', async () => {
      jest.spyOn(teamRepository, 'save').mockRejectedValue(new Error('error'));

      try {
        await service.createTeam(19, new CreateTeamDto({ teamName: '124' }));
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 생성 실패(FindOne User Error)', async () => {
      const team: Team = new Team({ teamName: 'test', userTeams: [] });

      const saveTeamSpy = jest
        .spyOn(teamRepository, 'save')
        .mockResolvedValue(team);

      jest.spyOn(userRepository, 'findOne').mockRejectedValue(undefined);

      try {
        await service.createTeam(19, new CreateTeamDto({ teamName: 'test' }));
      } catch (error) {
        expect(error.message).toBe("Can't find user");
      }

      expect(saveTeamSpy).toBeCalledWith(team);
    });

    it('팀 생성 실패(Save UserTeam Error)', async () => {
      const team: Team = new Team({ teamName: 'test', userTeams: [] });
      const user: User = new User({
        id: 1,
        name: 'test',
        email: 'asdf@asdf.com',
        password: 'asdf',
        userTeams: [],
      });

      const saveTeamSpy = jest
        .spyOn(teamRepository, 'save')
        .mockResolvedValue(team);

      const findOneUserSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user);

      jest
        .spyOn(userTeamRepository, 'save')
        .mockRejectedValue(new Error('error'));

      try {
        await service.createTeam(1, new CreateTeamDto({ teamName: 'test' }));
      } catch (error) {
        expect(error.message).toBe('error');
      }

      expect(saveTeamSpy).toBeCalledWith(team);
      expect(findOneUserSpy).toBeCalledWith(1);
    });

    it('팀 생성 성공', async () => {
      const team: Team = new Team({ teamName: 'test', userTeams: [] });
      const user: User = new User({
        id: 1,
        name: 'test',
        email: 'asdf@asdf.com',
        password: 'asdf',
        userTeams: [],
      });
      const userTeam: UserTeam = new UserTeam({ user: user, team: team });

      const saveTeamSpy = jest
        .spyOn(teamRepository, 'save')
        .mockResolvedValue(team);

      const findOneUserSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user);

      const saveUserTeamSpy = jest
        .spyOn(userTeamRepository, 'save')
        .mockResolvedValue(userTeam);

      const result = await service.createTeam(
        1,
        new CreateTeamDto({ teamName: 'test' }),
      );

      expect(result).toBe(team);
      expect(saveTeamSpy).toBeCalledWith(team);
      expect(findOneUserSpy).toBeCalledWith(1);
      expect(saveUserTeamSpy).toBeCalledWith(userTeam);
    });
  });

  describe('TeamService 팀명 수정', () => {
    it('팀명 수정 실패(Update Team Error)', async () => {
      const updateResult = new UpdateResult();
      updateResult.generatedMaps = [];
      updateResult.raw = [];
      updateResult.affected = 0;

      jest.spyOn(teamRepository, 'update').mockResolvedValue(updateResult);

      try {
        await service.updateTeamName(
          1,
          new UpdateTeamDto({ teamName: 'Update Team' }),
        );
      } catch (error) {
        expect(error.message).toBe('Fail to Change Team Name');
      }
    });

    it('팀명 수정 성공', async () => {
      const updateResult = new UpdateResult();
      updateResult.generatedMaps = [];
      updateResult.raw = [];
      updateResult.affected = 1;

      jest.spyOn(teamRepository, 'update').mockResolvedValue(updateResult);

      const result = await service.updateTeamName(
        1,
        new UpdateTeamDto({ teamName: 'Update Team' }),
      );

      expect(result).toBe('Team name updated successfully');
    });
  });

  describe('TeamService 팀 탈퇴', () => {
    it('팀 탈퇴 실패(Delete UserTeam Error)', async () => {
      jest
        .spyOn(userTeamRepository, 'deleteWithUserIdAndTeamId')
        .mockRejectedValue(new Error('error'));

      try {
        await service.leaveTeam(1, 1);
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 탈퇴 성공', async () => {
      const deleteResult = new DeleteResult();
      deleteResult.raw = [];
      deleteResult.affected = 1;

      jest
        .spyOn(userTeamRepository, 'deleteWithUserIdAndTeamId')
        .mockResolvedValue(deleteResult);

      const result = await service.leaveTeam(1, 1);
      expect(result).toBe('Team left successfully');
    });
  });

  describe('TeamService 팀 삭제', () => {
    it('팀 삭제 실패(Delete Team Error)', async () => {
      jest
        .spyOn(teamRepository, 'delete')
        .mockRejectedValue(new Error('error'));

      try {
        await service.deleteTeam(1);
      } catch (error) {
        expect(error.message).toBe('error');
      }
    });

    it('팀 삭제 성공', async () => {
      const deleteResult = new DeleteResult();
      deleteResult.raw = [];
      deleteResult.affected = 1;

      jest.spyOn(teamRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.deleteTeam(1);
      expect(result).toBe('Team deleted successfully');
    });
  });
});
