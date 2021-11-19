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
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.actorService
      .findOne(id)
      .then((actor) => {
        return {
          statusCode: HttpStatus.OK,
          result: actor,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }

  @Post('/create')
  async save(@Body() actorCreateDto: ActorCreateDto): Promise<ResultMessage> {
    return await this.actorService
      .save(actorCreateDto)
      .then((actor) => {
        return {
          statusCode: HttpStatus.OK,
          result: actor,
        };
      })
      .catch((err) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          result: err.message,
        };
      });
  }
}
