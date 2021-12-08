import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Actor } from '../../actor/entities/actor.entity';
import { Country } from '../../country/entities/country.entity';
import { Genre } from '../../genre/entities/genre.entity';
import { Director } from '../../director/entities/director.entity';

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

  @IsNotEmpty()
  genres: Genre[];

  @IsNotEmpty()
  directors: Director[];
}
