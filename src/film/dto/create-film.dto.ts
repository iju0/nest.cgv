import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Actor } from '../../actor/entities/actor.entity';
import { Country } from '../../country/entities/country.entity';

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

  @IsNotEmpty()
  actors: Actor[];

  @IsNotEmpty()
  countries: Country[];
}
