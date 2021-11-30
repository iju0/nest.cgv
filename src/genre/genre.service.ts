import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';
import { throws } from 'assert';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}


  // Create
  async createGenre(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;
    const genre = this.genreRepository.create({
      name,
    });

    await this.genreRepository.save(genre);
    return genre;
  }


  // Read
  async getGenreById(id: number): Promise<Genre> {
    const found = await this.genreRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Genre with id ${id}`);
    }

    return found;
  }

  // Delete
  async deleteGenre(id: number): Promise<void> {
    const result = await this.genreRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Can't find Genre with id ${id}`);
    }
  }

  // Update
  async updateGenreStaus(id: number): Promise<Genre>{
    const genre = await this.getGenreById(id);
    await this.genreRepository.save(genre);
    return genre;
  }
  
  // List
  async getAllGenre(): Promise<Genre[]>{
    return this.genreRepository.find();
  }


}
