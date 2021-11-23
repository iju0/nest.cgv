import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { ResultMessage } from '../result.message';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  async create(@Body() createCinemaDto: CreateCinemaDto) {
    return await this.cinemaService.create(createCinemaDto);
  }

  @Get()
  async findAll() {
    return await this.cinemaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cinemaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCinemaDto: UpdateCinemaDto,
  ) {
    return await this.cinemaService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cinemaService.remove(+id);
  }
}
