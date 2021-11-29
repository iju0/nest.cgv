import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { getConnection, Repository } from 'typeorm';
import { Film } from '../film/entities/film.entity';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Seat } from '../seat/entities/seat.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Cinema)
    private cinemaRepository: Repository<Cinema>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    const cinema = await this.cinemaRepository.findOne(createSaleDto.cinema);
    const film = await this.filmRepository.findOne(createSaleDto.film);
    const seat = await this.seatRepository.findOne(createSaleDto.seat);

    if (!cinema) {
      throw new Error('영화관 정보를 찾을수 없습니다.');
    }

    if (!film) {
      throw new Error('영화정보를 찾을 수 없습니다.');
    }

    if (!seat) {
      throw new Error('죄석정보를 찾을 수 없습니다.');
    }

    const sale = await this.saleRepository.create(createSaleDto);
    sale.filmId = createSaleDto.film.id;
    sale.cinemaId = createSaleDto.cinema.id;
    sale.seatId = createSaleDto.seat.id;
    return await this.saleRepository.save(sale);
  }

  async findAll() {
    return await this.saleRepository.find();
  }

  async findOne(id: number) {
    return await this.saleRepository.findOne(id);
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  async remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
