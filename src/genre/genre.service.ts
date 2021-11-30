import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async createGenre(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;
    const genre = this.genreRepository.create({
      name,
    });

    await this.genreRepository.save(genre);
    return genre;
  }

  async getGenreById(id: number): Promise<Genre> {
    const found = await this.genreRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Genre with id ${id}`);
    }

    return found;
  }
}
