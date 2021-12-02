import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { FilmActor } from './entities/film-actor.entity';
import { Actor } from '../actor/entities/actor.entity';
import { Country } from '../country/entities/country.entity';
import { FilmCountry } from './entities/film-country.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(FilmActor)
    private filmActorRepository: Repository<FilmActor>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(FilmCountry)
    private filmCountryRepository: Repository<FilmCountry>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const film = new Film();
      film.title = createFilmDto.title;
      film.summary = createFilmDto.summary;
      film.rate = createFilmDto.rate;
      film.releaseDate = createFilmDto.releaseDate;
      film.runningTime = createFilmDto.runningTime;
      film.regDate = new Date();

      film.actors = await Promise.all(createFilmDto.actors).then(
        async (data) => {
          const actor = this.actorRepository.create(data);
          await queryRunner.manager.save(actor);
          return actor;
        },
      );

      film.countries = await Promise.all(createFilmDto.countries).then(
        async (data) => {
          const country = this.countryRepository.create(data);
          await queryRunner.manager.save(country);
          return country;
        },
      );

      await queryRunner.manager.save(film);
      await queryRunner.commitTransaction();
      return film;
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
