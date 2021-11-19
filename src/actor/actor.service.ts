import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entity/actor.entity';
import { Repository } from 'typeorm';
import { ActorCreateDto } from './dto/actor.create.dto';
import { ResultMessage } from '../result.message';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.find();
  }

  async findOne(id: number): Promise<Actor> {
    return await this.actorRepository.findOne(id);
  }

  async isExist(name: string): Promise<boolean> {
    const count = await this.actorRepository.count({ name });
    return count > 0;
  }

  async save(actorCreateDto: ActorCreateDto): Promise<Actor> {
    const actorIsExist = await this.isExist(actorCreateDto.name);

    if (actorIsExist) {
      throw new NotFoundException('이미 데이터가 존재합니다.');
    }
    const actor = new Actor();
    actor.name = actorCreateDto.name;
    await this.actorRepository.save(actor);
    return await this.actorRepository.findOne(actor);
  }
}
