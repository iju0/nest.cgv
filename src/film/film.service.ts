import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = new Film();
    film.title = createFilmDto.title;
    film.summary = createFilmDto.summary;
    film.rate = createFilmDto.rate;
    film.releaseDate = createFilmDto.releaseDate;
    film.runningTime = createFilmDto.runningTime;
    film.regDate = new Date();
    return await this.filmRepository.save(film);
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
