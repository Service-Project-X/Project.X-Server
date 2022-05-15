import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { UserTeam } from './user-team.entity';

@EntityRepository(UserTeam)
export class UserTeamRepository extends Repository<UserTeam> {
  async findOneWithUserIdAndTeamId(
    userId: number,
    teamId: number,
  ): Promise<UserTeam> {
    try {
      return await this.createQueryBuilder()
        .where('userId = :userId', { userId: userId })
        .andWhere('teamId = :teamId', { teamId: teamId })
        .getOne();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteWithUserIdAndTeamId(
    userId: number,
    teamId: number,
  ): Promise<DeleteResult> {
    return await this.createQueryBuilder()
      .delete()
      .from(UserTeam)
      .where('userId = :userId', { userId: userId })
      .andWhere('teamId = :teamId', { teamId: teamId })
      .execute();
  }
}
