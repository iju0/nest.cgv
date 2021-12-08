import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { FilmActor } from './entities/film-actor.entity';
import { Actor } from '../actor/entities/actor.entity';
import { Country } from '../country/entities/country.entity';
import { FilmCountry } from './entities/film-country.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Director } from '../director/entities/director.entity';
import { FilmDirector } from './entities/film-director.entity';
import { FilmGenre } from './entities/film-genre.entity';

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
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
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

      film.genres = await Promise.all(createFilmDto.genres).then(
        async (data) => {
          const genre = this.genreRepository.create(data);
          await queryRunner.manager.save(genre);
          return genre;
        },
      );

      film.directors = await Promise.all(createFilmDto.directors).then(
        async (data) => {
          const director = this.directorRepository.create(data);
          await queryRunner.manager.save(director);
          return director;
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
    return await getConnection()
      .getRepository(Film)
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.actors', 'actor')
      .leftJoinAndSelect('film.countries', 'country')
      .leftJoinAndSelect('film.genres', 'genre')
      .leftJoinAndSelect('film.directors', 'director')
      .getMany();
  }

  async findOne(id: number) {
    return await getConnection()
      .getRepository(Film)
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.actors', 'actor')
      .leftJoinAndSelect('film.countries', 'country')
      .leftJoinAndSelect('film.genres', 'genre')
      .leftJoinAndSelect('film.directors', 'director')
      .where('film.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const queryRunner = await getConnection().createQueryRunner();
    try {
      queryRunner.startTransaction();

      const film = await this.filmRepository.findOne(id);
      film.title = updateFilmDto.title;
      film.summary = updateFilmDto.summary;
      film.releaseDate = updateFilmDto.releaseDate;
      film.runningTime = updateFilmDto.runningTime;
      film.rate = updateFilmDto.rate;

      film.actors = await Promise.all(updateFilmDto.actors).then(
        async (data) => {
          const actor = this.actorRepository.create(data);
          await queryRunner.manager.save(actor);
          return actor;
        },
      );

      film.countries = await Promise.all(updateFilmDto.countries).then(
        async (data) => {
          const country = this.countryRepository.create(data);
          await queryRunner.manager.save(country);
          return country;
        },
      );

      film.genres = await Promise.all(updateFilmDto.genres).then(
        async (data) => {
          const genre = this.genreRepository.create(data);
          await queryRunner.manager.save(genre);
          return genre;
        },
      );

      film.directors = await Promise.all(updateFilmDto.directors).then(
        async (data) => {
          const director = this.directorRepository.create(data);
          await queryRunner.manager.save(director);
          return director;
        },
      );

      await queryRunner.manager.save(film);
      await queryRunner.commitTransaction();
      return film;
    } catch (err) {
      console.log(err);
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(FilmActor)
        .where('film_actor.film_id = :id', { id })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(FilmCountry)
        .where('film_country.film_id = :id', { id })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(FilmDirector)
        .where('film_director.film_id = :id', { id })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(FilmGenre)
        .where('film_genre.film_id = :id', { id })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Film)
        .where('film.id = :id', { id })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
