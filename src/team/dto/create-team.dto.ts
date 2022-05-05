import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  constructor(partial: Partial<CreateTeamDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  teamName: string;
}
