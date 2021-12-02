import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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

  // Create
  @Post()
  @UsePipes(ValidationPipe)
  createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.createGenre(createGenreDto);
  }

  // Read
  @Get('/:id')
  getGenreById(@Param('id') id: number): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }

  // Update
  @Patch('/:id')
  updateGenre(@Param('id', ParseIntPipe) id: number){
    return this.genresService.updateGenreStaus(id);
  }

  // Delete
  @Delete('/:id')
  async deleteGenre(@Param('id', ParseIntPipe) id): Promise<void> { 
    return this.genresService.deleteGenre(id);
  }

  // List
  @Get()
  getAllGenre(): Promise<Genre[]> {
    return this.genresService.getAllGenre();
  }



}
 