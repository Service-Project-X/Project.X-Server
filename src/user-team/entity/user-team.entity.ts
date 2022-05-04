import { User } from 'src/user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../team/entity/team.entity';

@Entity()
export class UserTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userTeams)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Team, (team) => team.userTeams)
  @JoinColumn()
  team: Team;
}
