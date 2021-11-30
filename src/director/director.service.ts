import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  async getDirectorById(id: number): Promise<Director> {
    const found = await this.directorRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Not Found`);
    }
    return found;
  }

  async getDirectorAll(): Promise<Director[]> {
    return this.directorRepository.find();
  }

  async insertDirector(
    createDirectorDto: CreateDirectorDto,
  ): Promise<Director> {
    const director = this.directorRepository.create(createDirectorDto);

    await this.directorRepository.save(director);

    return director;
  }

  async deleteDirector(id: number): Promise<void> {
    const result = await this.directorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('not found');
    }

    console.log('result : ', result);
  }
}
