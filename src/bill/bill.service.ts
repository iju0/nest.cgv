import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    const bill = await this.billRepository.create(createBillDto);
    return await this.billRepository.save(bill);
  }

  async findAll() {
    return await this.billRepository.find();
  }

  async findOne(id: number) {
    return await this.billRepository.findOne(id);
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = await this.findOne(id);

    if (!bill) {
      throw new Error('데이터를 찾을 수 없습니다.');
    }

    bill.gubun = updateBillDto.gubun;
    bill.amount = updateBillDto.amount;
    bill.paymentContact = updateBillDto.paymentContact;
    bill.paymentMethod = updateBillDto.paymentMethod;
    bill.paymentNumber = updateBillDto.paymentNumber;
    bill.paymentOwner = updateBillDto.paymentOwner;
    bill.paymentValidate = updateBillDto.paymentValidate;

    return await this.billRepository.save(bill);
  }

  async remove(id: number) {
    const bill = await this.findOne(id);
    return await this.billRepository.remove(bill);
  }
}
