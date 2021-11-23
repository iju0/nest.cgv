import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
