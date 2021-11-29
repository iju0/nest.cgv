import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Film } from '../../film/entities/film.entity';
import { Cinema } from '../../cinema/entities/cinema.entity';
import { Seat } from '../../seat/entities/seat.entity';

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  openDate: string;

  @IsString()
  @IsNotEmpty()
  closeDate: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  film: Film;

  @IsNotEmpty()
  cinema: Cinema;

  @IsNotEmpty()
  seat: Seat;
}
