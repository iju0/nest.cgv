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
    const hasCinema = await this.isExist(createCinemaDto.name);

    if (hasCinema) {
      throw new Error('이미 등록된 정보가 있습니다.');
    }

    const cinema = new Cinema();
    cinema.name = createCinemaDto.name;

    await this.cinemaRepository.save(cinema);
    return await this.cinemaRepository.findOne(cinema);
  }

  async isExist(name: string): Promise<boolean> {
    return (await this.cinemaRepository.count({ name })) > 0;
  }

  findAll() {
    return `This action returns all cinema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cinema`;
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return `This action updates a #${id} cinema`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
