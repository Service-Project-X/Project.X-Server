import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entity/user.entity';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Team } from '../entity/team.entity';
import { TeamService } from '../team.service';
import { UserTeamService } from '../../user-team/user-team.service';
import { UserTeam } from '../../user-team/entity/user-team.entity';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Repository, UpdateResult } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

let service: TeamService;
let teamRepository: MockRepository<Team>;
let userRepository: MockRepository<User>;
let userTeamRepository: MockRepository<UserTeam>;

async function injectDependence() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TeamService,
      {
        provide: getRepositoryToken(Team),
        useValue: {
          save: jest.fn(),
          update: jest.fn(),
        },
      },
      {
        provide: getRepositoryToken(User),
        useValue: {
          findOne: jest.fn(),
        },
      },
      {
        provide: getRepositoryToken(UserTeam),
        useValue: {
          save: jest.fn(),
        },
      },
      UserService,
      UserTeamService,
    ],
  }).compile();

  service = module.get<TeamService>(TeamService);
  teamRepository = module.get<MockRepository<Team>>(getRepositoryToken(Team));
  userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  userTeamRepository = module.get<MockRepository<UserTeam>>(
    getRepositoryToken(UserTeam),
  );
}

describe('TeamService', () => {
  beforeEach(async () => {
    await injectDependence();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('TeamService 팀 생성', () => {
  beforeEach(async () => {
    await injectDependence();
  });

  it('팀 생성 실패(Save Team Error)', async () => {
    teamRepository.save.mockImplementation(() =>
      Promise.reject(new Error('error')),
    );

    try {
      await service.createTeam(1, new CreateTeamDto({ teamName: 'test' }));
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });

  it('팀 생성 실패(FindOne User Error)', async () => {
    teamRepository.save.mockImplementation(() => Promise.resolve(new Team({})));

    userRepository.findOne.mockImplementation(() =>
      Promise.reject(new Error('error')),
    );

    try {
      await service.createTeam(1, new CreateTeamDto({ teamName: 'test' }));
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });

  it('팀 생성 실패(Save UserTeam Error)', async () => {
    teamRepository.save.mockImplementation(() => Promise.resolve(new Team({})));

    userRepository.findOne.mockImplementation(() =>
      Promise.resolve(
        new User({
          id: 1,
          name: 'test',
          email: 'asdf@asdf.com',
          password: 'asdf',
          userTeams: [],
        }),
      ),
    );

    userTeamRepository.save.mockImplementation(() =>
      Promise.reject(new Error('error')),
    );

    try {
      await service.createTeam(1, new CreateTeamDto({ teamName: 'test' }));
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });

  it('팀 생성 성공', async () => {
    teamRepository.save.mockImplementation(() => Promise.resolve(new Team({})));

    userRepository.findOne.mockImplementation(() =>
      Promise.resolve(
        new User({
          id: 1,
          name: 'test',
          email: 'asdf@asdf.com',
          password: 'asdf',
          userTeams: [],
        }),
      ),
    );

    userTeamRepository.save.mockImplementation(() =>
      Promise.resolve(
        new UserTeam({ id: 1, user: new User({}), team: new Team({}) }),
      ),
    );

    const result = await service.createTeam(
      1,
      new CreateTeamDto({ teamName: 'test' }),
    );

    expect(result).toStrictEqual(new Team({}));
  });
});

describe('TeamService 팀명 수정', () => {
  beforeEach(async () => {
    await injectDependence();
  });

  it('팀명 수정 실패(Update Team Error)', async () => {
    teamRepository.update.mockImplementation(() => new Error('Team not found'));

    try {
      await service.updateTeamName(
        1,
        new UpdateTeamDto({ teamName: 'Update Team' }),
      );
    } catch (error) {
      expect(error.message).toBe('Team not found');
    }
  });

  it('팀명 수정 성공', async () => {
    teamRepository.update.mockResolvedValue(new UpdateResult());

    const result = await service.updateTeamName(
      1,
      new UpdateTeamDto({ teamName: 'Update Team' }),
    );

    expect(result).toBe('Team name updated successfully');
  });
});
