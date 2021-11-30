import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorRepository } from './director.repository';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorRepository)
    private directorRepository: DirectorRepository,
  ) {}

  async getDirectorById(id: number): Promise<Director> {
    const found = await this.directorRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Not Found`);
    }
    return found;
  }

  // async createDirector(createDirecotrDto: CreateDirectorDto): Promise<Director>{
  //     const {name} = createDirecotrDto;

  //     const director =
  // }
}
