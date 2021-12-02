import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Actor } from '../actor/entities/actor.entity';
import { FilmActor } from './entities/film-actor.entity';
import { FilmCountry } from './entities/film-country.entity';
import { Country } from '../country/entities/country.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Director } from '../director/entities/director.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Film,
      Actor,
      FilmActor,
      Country,
      FilmCountry,
      Genre,
      Director,
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
