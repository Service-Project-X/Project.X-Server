import { EntityRepository, Repository } from 'typeorm';
import { UserTeam } from './user-team.entity';

@EntityRepository(UserTeam)
export class UserTeamRepository extends Repository<UserTeam> {}
