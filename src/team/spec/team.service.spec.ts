import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entity/user.entity';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Team } from '../entity/team.entity';
import { TeamRepository } from '../entity/team.repository';
import { TeamService } from '../team.service';
import { UserTeamService } from '../../user-team/user-team.service';
import { UserTeam } from '../../user-team/entity/user-team.entity';

let service: TeamService;
let teamRepository: TeamRepository;
let userService: UserService;
let userTeamService: UserTeamService;

async function injectDependence() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TeamService,
      TeamRepository,
      {
        provide: getRepositoryToken(Team),
        useValue: {
          save: jest.fn(),
        },
      },
      {
        provide: UserService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
        },
      },
      {
        provide: UserTeamService,
        useValue: {
          findOne: jest.fn(),
          save: jest.fn(),
        },
      },
    ],
  }).compile();

  service = module.get<TeamService>(TeamService);
  teamRepository = module.get<TeamRepository>(TeamRepository);
  userService = module.get<UserService>(UserService);
  userTeamService = module.get<UserTeamService>(UserTeamService);
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
    jest
      .spyOn(teamRepository, 'save')
      .mockImplementation(() => Promise.reject(new Error('error')));

    const result = await service.createTeam(
      1,
      new CreateTeamDto({ teamName: 'test' }),
    );

    expect(result).toBeUndefined();
  });

  it('팀 생성 실패(FindOne User Error)', async () => {
    jest
      .spyOn(teamRepository, 'save')
      .mockImplementation(() => Promise.reject(new Team({})));

    jest.spyOn(userService, 'findOne').mockImplementation(() =>
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

    const result = await service.createTeam(
      1,
      new CreateTeamDto({ teamName: 'test' }),
    );

    expect(result).toBeUndefined();
  });

  it('팀 생성 실패(Save UserTeam Error)', async () => {
    jest
      .spyOn(teamRepository, 'save')
      .mockImplementation(() => Promise.reject(new Team({})));

    jest.spyOn(userService, 'findOne').mockImplementation(() =>
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

    jest
      .spyOn(userTeamService, 'save')
      .mockImplementation(() =>
        Promise.resolve(
          new UserTeam({ id: 1, user: new User({}), team: new Team({}) }),
        ),
      );

    const result = await service.createTeam(
      1,
      new CreateTeamDto({ teamName: 'test' }),
    );

    expect(result).toBeUndefined();
  });

  it('팀 생성 성공', async () => {
    jest
      .spyOn(teamRepository, 'save')
      .mockImplementation(() => Promise.reject(new Team({})));

    jest.spyOn(userService, 'findOne').mockImplementation(() =>
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

    jest
      .spyOn(userTeamService, 'save')
      .mockImplementation(() =>
        Promise.resolve(
          new UserTeam({ id: 1, user: new User({}), team: new Team({}) }),
        ),
      );

    const result = await service.createTeam(
      1,
      new CreateTeamDto({ teamName: 'test' }),
    );

    expect(result).toBeUndefined();
  });
});
