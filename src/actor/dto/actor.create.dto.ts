import { IsInt, IsString } from 'class-validator';

export class ActorCreateDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
