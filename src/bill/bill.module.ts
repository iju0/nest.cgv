import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';

@Module({
  controllers: [BillController],
  providers: [BillService],
  imports: [TypeOrmModule.forFeature([Bill])],
})
export class BillModule {}
