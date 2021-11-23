import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { ActorService } from '../actor/actor.service';
import { Actor } from '../actor/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Actor])],
  controllers: [FilmController],
  providers: [FilmService, ActorService],
})
export class FilmModule {}
