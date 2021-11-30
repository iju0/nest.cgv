import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Seat } from '../seat/entities/seat.entity';
import { Cinema } from '../cinema/entities/cinema.entity';
import { Film } from '../film/entities/film.entity';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [TypeOrmModule.forFeature([Sale, Film, Cinema, Seat])],
})
export class SalesModule {}
