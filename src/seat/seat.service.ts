import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const seat = this.seatRepository.create(createSeatDto);
    return await this.seatRepository.save(seat);
  }

  async findAll() {
    return await this.seatRepository.find();
  }

  async findOne(id: number) {
    return await this.seatRepository.findOne(id);
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const seat = await this.findOne(id);
    seat.colName = updateSeatDto.colName;
    seat.rowName = updateSeatDto.rowName;
    return await this.seatRepository.save(seat);
  }

  async remove(id: number) {
    const seat = await this.findOne(id);
    if (!seat) {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
    return await this.seatRepository.remove(seat);
  }
}
