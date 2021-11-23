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
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ResultMessage } from '../result.message';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  async findAll() {
    return await this.actorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.actorService.findOne(id);
  }

  @Post()
  async create(@Body() createActorDto: CreateActorDto) {
    return await this.actorService.create(createActorDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return await this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.actorService.remove(+id);
  }
}
