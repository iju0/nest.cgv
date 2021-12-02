import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateFilmDto } from 'src/film/dto/update-film.dto';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director } from './entities/director.entity';

@Controller('director')
export class DirectorController {
  constructor(private directorService: DirectorService) {}

  @Get()
  getDirector(): Promise<Director[]> {
    return this.directorService.getDirectorAll();
  }

  @Get('/:id')
  getDirectorById(@Param('id', ParseIntPipe) id: number): Promise<Director> {
    return this.directorService.getDirectorById(id);
  }

  @Post()
  insertDirector(
    @Body() createDirectorDto: CreateDirectorDto,
  ): Promise<Director> {
    return this.directorService.insertDirector(createDirectorDto);
  }

  @Delete('/:id')
  deleteDirector(@Param('id', ParseIntPipe) id: number): Promise<Director> {
    return this.directorService.deleteDirector(id);
  }

  @Patch('/:id')
  updateDirector(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.updateDirector(id, updateDirectorDto);
  }
}
