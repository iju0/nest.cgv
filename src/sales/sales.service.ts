import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { Film } from '../film/entities/film.entity';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Seat } from '../seat/entities/seat.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
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

    const sale = await this.salesRepository.create(createSaleDto);
    sale.filmId = createSaleDto.film.id;
    sale.cinemaId = createSaleDto.cinema.id;
    sale.seatId = createSaleDto.seat.id;
    return await this.salesRepository.save(sale);
  }

  async findAll() {
    return await this.salesRepository.find();
  }

  async findOne(id: number) {
    return await this.salesRepository.findOne(id);
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const cinema = await this.cinemaRepository.findOne(updateSaleDto.cinema);
    const film = await this.filmRepository.findOne(updateSaleDto.film);
    const seat = await this.seatRepository.findOne(updateSaleDto.seat);

    if (!cinema) {
      throw new Error('영화관 정보를 찾을수 없습니다.');
    }

    if (!film) {
      throw new Error('영화정보를 찾을 수 없습니다.');
    }

    if (!seat) {
      throw new Error('죄석정보를 찾을 수 없습니다.');
    }

    const sales = await this.salesRepository.findOne(id);
    sales.cinemaId = cinema.id;
    sales.filmId = film.id;
    sales.seatId = seat.id;
    sales.active = updateSaleDto.active;
    sales.openDate = updateSaleDto.openDate;
    sales.closeDate = updateSaleDto.closeDate;

    return await this.salesRepository.save(sales);
  }

  async remove(id: number) {
    const sales = await this.salesRepository.findOne(id);
    if (!sales) {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
    return await this.salesRepository.remove(sales);
  }
}
