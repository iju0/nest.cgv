import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director } from './entities/director.entity';

@Controller('director')
export class DirectorController {
  constructor(private directorService: DirectorService) {}


  @Get('/:id')
  getDirectorById(@Param('id') id: number): Promise<Director> {
      return this.directorService.getDirectorById(id);
  }
}
