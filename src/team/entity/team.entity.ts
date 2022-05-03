import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserTeam } from './user-team.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  teamName: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeams: UserTeam[];
}
