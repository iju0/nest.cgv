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
  async create(
    @Body() createCinemaDto: CreateCinemaDto,
  ): Promise<ResultMessage> {
    return await this.cinemaService
      .create(createCinemaDto)
      .then((cinema) => {
        return {
          statusCode: HttpStatus.OK,
          result: cinema,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }

  @Get()
  async findAll(): Promise<ResultMessage> {
    return await this.cinemaService
      .findAll()
      .then((cinema) => {
        return {
          statusCode: HttpStatus.OK,
          result: cinema,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cinemaService
      .findOne(+id)
      .then((cinema) => {
        return {
          statusCode: HttpStatus.OK,
          result: cinema,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCinemaDto: UpdateCinemaDto,
  ) {
    return await this.cinemaService
      .update(+id, updateCinemaDto)
      .then((cinema) => {
        return {
          statusCode: HttpStatus.OK,
          result: cinema,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cinemaService
      .remove(+id)
      .then((cinema) => {
        return {
          statusCode: HttpStatus.OK,
          result: cinema,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }
}
