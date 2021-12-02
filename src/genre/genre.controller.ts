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
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';


@Controller('genre')
export class GenreController {
  constructor(private genresService: GenreService) {}

  // Create
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }
  
  // List
  @Get()
  getAll(): Promise<Genre[]> {
    return this.genresService.getAll();
  }

  // Read
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Genre> {
    return this.genresService.findOne(id);
  }

  // Update
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number , @Body()updateGenreDto: UpdateGenreDto){
    return this.genresService.update(id, updateGenreDto);
  }

  // Delete
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) { 
    return this.genresService.delete(id);
  }


}
 