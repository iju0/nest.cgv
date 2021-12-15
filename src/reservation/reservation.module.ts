import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Bill } from 'src/bill/entities/bill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Film } from 'src/film/entities/film.entity';
import { Cinema } from 'src/cinema/entities/cinema.entity';
import { Seat } from 'src/seat/entities/seat.entity';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports: [TypeOrmModule.forFeature([Reservation, Bill, Sale, Film, Cinema, Seat])]
})
export class ReservationModule {}
