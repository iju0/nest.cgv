import { Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBillDto {

  @IsNotEmpty()
  @IsString()
  gubun: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  paymentNumber: string;

  @IsNotEmpty()
  @IsString()
  paymentValidate: string;

  @IsNotEmpty()
  @IsString()
  paymentOwner: string;

  @IsNotEmpty()
  @IsString()
  paymentContact: string;
}
