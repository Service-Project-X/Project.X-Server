import { User } from '../../user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../team/entity/team.entity';

@Entity()
export class UserTeam {
  constructor(partial: Partial<UserTeam>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userTeams)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Team, (team) => team.userTeams)
  @JoinColumn()
  team: Team;
}
