import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from './entities/cinema.entity';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private cinemaRepository: Repository<Cinema>,
  ) {}

  async create(createCinemaDto: CreateCinemaDto) {
    const hasCinema = await this.cinemaRepository.findOne(createCinemaDto);
    if (hasCinema) {
      throw new Error('이미 등록된 정보가 있습니다.');
    }
    const cinema = await this.cinemaRepository.create();
    cinema.name = createCinemaDto.name;
    return await this.cinemaRepository.save(cinema);
  }

  async isExist(name: string): Promise<boolean> {
    return (await this.cinemaRepository.count({ name })) > 0;
  }

  async findAll(): Promise<Cinema[]> {
    return await this.cinemaRepository.find();
  }

  async findOne(id: number): Promise<Cinema> {
    return await this.cinemaRepository.findOne(id);
  }

  async update(id: number, updateCinemaDto: UpdateCinemaDto) {
    const cinema = await this.findOne(id);
    if (!cinema) {
      throw new Error('등록된 정보를 찾을 수 없습니다.');
    }
    cinema.name = updateCinemaDto.name;
    return await this.cinemaRepository.save(cinema);
  }

  async remove(id: number) {
    const cinema = await this.findOne(id);
    if (!cinema) {
      throw new Error('등록된 정보를 찾을 수 없습니다.');
    }
    return await this.cinemaRepository.remove(cinema);
  }
}
