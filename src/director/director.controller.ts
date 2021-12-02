import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director } from './entities/director.entity';

@Controller('director')
export class DirectorController {
  constructor(private directorService: DirectorService) {}

  @Get()
  getDirector(): Promise<Director[]> {
    return this.directorService.getDirectorAll();
  }

  @Get('/:id')
  getDirectorById(@Param('id') id: number): Promise<Director> {
    return this.directorService.getDirectorById(id);
  }

  @Post()
  insertDirector(
    @Body() createDirectorDto: CreateDirectorDto,
  ): Promise<Director> {
    return this.directorService.insertDirector(createDirectorDto);
  }

  @Delete('/:id')
  deleteDirector(@Param('id') id: number): Promise<void> {
    return this.directorService.deleteDirector(id);
  }
}
