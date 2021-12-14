import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/bill/entities/bill.entity';
import { Cinema } from 'src/cinema/entities/cinema.entity';
import { Film } from 'src/film/entities/film.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Cinema)
    private cinemaRepository: Repository<Cinema>,
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const bill = await this.billRepository.findOne(
      createReservationDto.bill_id,
    );

    if (!bill) {
      throw new Error('청구정보를 찾을 수 없습니다');
    }

    const reservation = await this.reservationRepository.create(
      createReservationDto,
    );

    return await this.reservationRepository.save(reservation);
  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne(id);

    if (!reservation) {
      throw new Error('예약 정보가 없습니다');
    }

    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOne(id);
    const sales = await this.saleRepository.findOne(
      updateReservationDto.sales_id,
    );
    const film = await this.filmRepository.findOne(
      updateReservationDto.sales_film_id,
    );
    const cinema = await this.cinemaRepository.findOne(
      updateReservationDto.sales_cinema_id,
    );
    const seat = await this.seatRepository.findOne(
      updateReservationDto.sales_seat_id,
    );
    const bill = await this.billRepository.findOne(
      updateReservationDto.bill_id,
    );

    if (!reservation) {
      throw new Error('예약정보를 찾을 수 없습니다');
    }

    if (!sales) {
      throw new Error('판매정보를 찾을 수 없습니다');
    }

    if (!film) {
      throw new Error('필름정보를 찾을 수 없습니다');
    }

    if (!cinema) {
      throw new Error('영화정보를 찾을 수 없습니다');
    }

    if (!seat) {
      throw new Error('좌석정보를 찾을 수 없습니다');
    }

    if (!bill) {
      throw new Error('거래정보를 찾을 수 없습니다');
    }

    reservation.serial_number = updateReservationDto.serial_number;
    reservation.customer_name = updateReservationDto.customer_name;
    reservation.customer_phone = updateReservationDto.customer_phone;
    reservation.sales_id = updateReservationDto.sales_id;
    reservation.sales_film_id = updateReservationDto.sales_film_id;
    reservation.sales_cinema_id = updateReservationDto.sales_cinema_id;
    reservation.sales_seat_id = updateReservationDto.sales_seat_id;
    reservation.bill_id = updateReservationDto.bill_id;

    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);

    if (!reservation) {
      throw new Error('잘못된 정보 입니다');
    }
    return await this.reservationRepository.remove(reservation);
  }
}
