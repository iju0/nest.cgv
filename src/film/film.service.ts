import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { FilmActor } from './entities/film-actor.entity';
import { Actor } from '../actor/entities/actor.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(FilmActor)
    private filmActorRepository: Repository<FilmActor>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      if (!createFilmDto.actors || createFilmDto.actors.length === 0) {
        throw new Error('배우 정보를 찾을 수 없습니다.');
      }

      const film = new Film();
      film.title = createFilmDto.title;
      film.summary = createFilmDto.summary;
      film.rate = createFilmDto.rate;
      film.releaseDate = createFilmDto.releaseDate;
      film.runningTime = createFilmDto.runningTime;
      film.regDate = new Date();

      const { id } = await this.filmRepository.save(film);
      const actorIds = createFilmDto.actors.map((actor) => actor.id);
      const actors = await this.actorRepository.findByIds(actorIds);

      if (createFilmDto.actors.length !== actors.length) {
        throw new Error('등록되지 않은 배우 정보가 있습니다.');
      }

      if (actors && actors.length > 0) {
        // filmActor 생성
        actors.map(async (actor) => {
          const filmActor = new FilmActor();
          filmActor.actorId = actor.id;
          filmActor.filmId = id;
          await this.filmActorRepository.save(filmActor);
        });
      }

      // TODO: film_director 처리
      // TODO: film_country 처리
      // TODO: film_genre 처리

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.filmRepository.find();
  }

  async findOne(id: number) {
    return await this.filmRepository.findOne(id);
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = new Film();
    film.id = id;
    film.title = updateFilmDto.title;
    film.summary = updateFilmDto.summary;
    film.rate = updateFilmDto.rate;
    film.runningTime = updateFilmDto.runningTime;
    film.releaseDate = updateFilmDto.releaseDate;
    return await this.filmRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.filmRepository.findOne(id);
    if (!film) {
      throw new Error('등록된 정보를 찾을 수 없습니다.');
    }
    return await this.filmRepository.remove(film);
  }
}
