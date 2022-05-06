import { IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserTeam } from '../../user-team/entity/user-team.entity';

@Entity()
export class Team {
  constructor(partial: Partial<Team>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  teamName: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeams: UserTeam[];
}
