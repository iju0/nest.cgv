import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entity/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  findAll(): Promise<Actor[]> {
    return this.actorRepository.find();
  }
}
