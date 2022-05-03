import { IsEmail, IsString } from 'class-validator';
import { UserTeam } from 'src/team/entity/user-team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @OneToMany(() => UserTeam, (userTeam) => userTeam.user)
  userTeams: UserTeam[];
}