import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';

@Controller('Genres')
export class GenreController {
  constructor(private genresService: GenreService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.createGenre(createGenreDto);
  }

  @Get('/:id')
  getGenreById(@Param('id') id: number): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }
}
