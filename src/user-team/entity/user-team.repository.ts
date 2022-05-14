import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { UserTeam } from './user-team.entity';

@EntityRepository(UserTeam)
export class UserTeamRepository extends Repository<UserTeam> {
  async deleteWithUserIdAndTeamId(
    userId: number,
    teamId: number,
  ): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .from(UserTeam)
      .where('user_id = :userId', { userId: userId })
      .andWhere('team_id = :teamId', { teamId: teamId })
      .execute();
  }
}
