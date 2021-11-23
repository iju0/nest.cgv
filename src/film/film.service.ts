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

  findAll() {
    return `This action returns all film`;
  }

  async findOne(id: number) {
    return await this.filmRepository.findOne(id);
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
