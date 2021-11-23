import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  runningTime: number;

  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;
}
