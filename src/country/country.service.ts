import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    return await this.countryRepository.save(country);
  }

  async findAll() {
    return await this.countryRepository.find();
  }

  async findOne(id: number) {
    return await this.countryRepository.findOne(id);
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.findOne(id);
    country.name = updateCountryDto.name;
    return await this.countryRepository.save(country);
  }

  async remove(id: number) {
    const country = await this.findOne(id);
    if (!country) {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
    return await this.countryRepository.remove(country);
  }
}
