import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Bill } from "src/bill/entities/bill.entity";
import { Cinema } from "src/cinema/entities/cinema.entity";
import { Film } from "src/film/entities/film.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Seat } from "src/seat/entities/seat.entity";

export class CreateReservationDto {

    @IsString()
    serial_number: string;

    @IsString()
    customer_name: string;

    @IsString()
    customer_phone: string;

    @IsNotEmpty()
    sale: Sale;

    @IsNotEmpty()
    film: Film;

    @IsNotEmpty()
    cinema: Cinema;

    @IsNotEmpty()
    seat: Seat;

    @IsNotEmpty()
    bill: Bill;
}
