import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

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

  async save(createActorDto: CreateActorDto): Promise<Actor> {
    const actorIsExist = await this.isExist(createActorDto.name);

    if (actorIsExist) {
      throw new NotFoundException('이미 데이터가 존재합니다.');
    }
    const actor = await this.actorRepository.create(createActorDto);
    return await this.actorRepository.save(actor);
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const actor = await this.actorRepository.findOne(id);
    if (!actor) {
      throw new NotFoundException('데이터를 찾을 수 없습니다.');
    }

    actor.name = updateActorDto.name;
    return await this.actorRepository.save(actor);
  }

  async remove(id: number): Promise<Actor> {
    const actor = await this.actorRepository.findOne(id);
    if (!actor) {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
    return await this.actorRepository.remove(actor);
  }
}
