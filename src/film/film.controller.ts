import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  async create(@Body() createFilmDto: CreateFilmDto) {
    /// TODO: film 등록시 모든 연관된 데이터가 등록되어야 함
    /// film_actor 테이블
    /// film_genre 테이블
    /// film_country 테이블
    /// film_director 테이블
    return await this.filmService.create(createFilmDto);
  }

  @Get()
  async findAll() {
    return await this.filmService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.filmService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return await this.filmService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.filmService.remove(+id);
  }
}
