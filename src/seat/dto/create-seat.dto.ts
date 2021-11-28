import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  rowName: string;

  @IsNumber()
  @IsNotEmpty()
  colName: string;
}
