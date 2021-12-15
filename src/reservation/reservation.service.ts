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

  async selectSaleFilmCinemaSeatBill(dto: CreateReservationDto | UpdateReservationDto){

    console.log(dto.sale.id);

    dto.bill = await this.billRepository.findOne(dto.bill.id);

    if (!dto.bill) {
      throw new Error('청구정보를 찾을 수 없습니다');
    }

    dto.sale = await this.saleRepository.findOne(dto.sale.id);

    if(!dto.sale){
      throw new Error('판매정보를 찾을 수 없습니다');
    }

    dto.film = await this.filmRepository.findOne(dto.film.id);

    if(!dto.film){
      throw new Error('필름정보를 찾을 수 없습니다');
    }

    dto.cinema = await this.cinemaRepository.findOne(dto.cinema.id);

    if(!dto.cinema){
      throw new Error('시네마정보를 찾을 수 없습니다');
    }

    dto.seat = await this.seatRepository.findOne(dto.seat.id);

    if(!dto.seat){
      throw new Error('좌석정보를 찾을 수 없습니다');
    }

    return dto;
  }

  async create(createReservationDto: CreateReservationDto) {

     const check = await this.selectSaleFilmCinemaSeatBill(createReservationDto);

     createReservationDto.bill = check.bill;
     createReservationDto.sale = check.sale;
     createReservationDto.cinema = check.cinema;
     createReservationDto.film = check.film;
     createReservationDto.seat = check.seat;

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

    if (!reservation) {
      throw new Error('예약정보를 찾을 수 없습니다');
    }

    const check = await this.selectSaleFilmCinemaSeatBill(updateReservationDto); 

     updateReservationDto.bill = check.bill;
     updateReservationDto.sale = check.sale;
     updateReservationDto.cinema = check.cinema;
     updateReservationDto.film = check.film;
     updateReservationDto.seat = check.seat;

    reservation.serial_number = updateReservationDto.serial_number;
    reservation.customer_name = updateReservationDto.customer_name;
    reservation.customer_phone = updateReservationDto.customer_phone;
    reservation.sales_id = updateReservationDto.sale.id;
    reservation.sales_film_id = updateReservationDto.film.id;
    reservation.sales_cinema_id = updateReservationDto.cinema.id;
    reservation.sales_seat_id = updateReservationDto.seat.id;
    reservation.bill_id = updateReservationDto.bill.id;

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