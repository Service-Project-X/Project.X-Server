import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamRepository } from '../entity/user-team.repository';
import { UserTeamService } from '../user-team.service';

describe('UserTeamService', () => {
  let service: UserTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTeamService, UserTeamRepository],
    }).compile();

    service = module.get<UserTeamService>(UserTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
