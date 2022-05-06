import { IsNotEmpty, IsString } from 'class-validator';

export class TeamBaseDto {
  constructor(partial: Partial<TeamBaseDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  teamName: string;
}
