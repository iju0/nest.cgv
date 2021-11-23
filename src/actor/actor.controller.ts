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

  @Get(':id')
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

  @Post()
  async save(@Body() createActorDto: CreateActorDto): Promise<ResultMessage> {
    return await this.actorService
      .save(createActorDto)
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto,
  ): Promise<ResultMessage> {
    return await this.actorService
      .update(+id, updateActorDto)
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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResultMessage> {
    return await this.actorService
      .remove(+id)
      .then((actor) => {
        return { statusCode: HttpStatus.OK, result: actor };
      })
      .catch((err) => {
        return { statusCode: HttpStatus.OK, result: err.message };
      });
  }
}
