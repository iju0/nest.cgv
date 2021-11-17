import { HttpStatus } from '@nestjs/common';
import { Actor } from './actor/entity/actor.entity';

export class ResultMessage {
  statusCode: HttpStatus;
  result: any;
}
