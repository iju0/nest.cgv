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
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }
}
