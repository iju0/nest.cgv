import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
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
  async create(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(genre);
  }


  // Read
  async findOne(id: number): Promise<Genre> {
    const found = await this.genreRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Genre with id ${id}`);
    }
    return found;
  }

  // Update
  async update(id: number ,updateGenreDto: UpdateGenreDto){
    const genre = await this.findOne(id);
    
    if (!genre) {
      throw new NotFoundException(`Can't find Genre with id ${id}`);
    }

    genre.name = updateGenreDto.name;
    return await this.genreRepository.save(genre);
  }

  // Delete
  async delete(id: number) {
    const result = await this.genreRepository.findOne(id);

    if(!result) {
      throw new NotFoundException(`Can't find Genre with id ${id}`);
    }

    return await this.genreRepository.remove(result);
  }
  
  // List
  async getAll(): Promise<Genre[]>{
    return this.genreRepository.find();
  }


}
