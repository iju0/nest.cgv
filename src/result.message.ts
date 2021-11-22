import { HttpStatus } from '@nestjs/common';
import { Actor } from './actor/entities/actor.entity';

export class ResultMessage {
  statusCode: HttpStatus;
  result: any;
}
