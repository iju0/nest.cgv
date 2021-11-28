import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';

@Module({
  controllers: [SeatController],
  providers: [SeatService],
  imports: [TypeOrmModule.forFeature([Seat])],
})
export class SeatModule {}
