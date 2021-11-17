import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorCreateDto } from './dto/actor.create.dto';
import { ResultMessage } from '../result.message';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('/')
  async findAll(): Promise<ResultMessage> {
    return await this.actorService
      .findAll()
      .then((actors) => {
        return {
          statusCode: HttpStatus.OK,
          result: actors,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          result: err.message,
        };
      });
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.actorService.findOne(id);
  }

  @Post('/create')
  async save(@Body() actorCreateDto: ActorCreateDto) {
    return await this.actorService.save(actorCreateDto);
  }
}
