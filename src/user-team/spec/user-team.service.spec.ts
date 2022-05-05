import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTeam } from '../entity/user-team.entity';
import { UserTeamRepository } from '../entity/user-team.repository';
import { UserTeamService } from '../user-team.service';

describe('UserTeamService', () => {
  let service: UserTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTeamService,
        UserTeamRepository,
        {
          provide: getRepositoryToken(UserTeam),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserTeamService>(UserTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
