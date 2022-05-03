import { IsEmail, IsString } from 'class-validator';
import { UserTeam } from 'src/team/entity/user-team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nickName: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  userTeams: UserTeam[];
}
