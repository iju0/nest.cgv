import { HttpStatus, Injectable } from '@nestjs/common';
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

  async save(actorCreateDto: ActorCreateDto): Promise<Actor> {
    const findActor = await this.actorRepository.findOne({
      name: actorCreateDto.name,
    });

    if (findActor) {
      console.log('이미 등록된 정보가 있습니다.');
      return null;
    }

    const actor = new Actor();
    actor.name = actorCreateDto.name;

    return await this.actorRepository.save(actor);
  }
}
