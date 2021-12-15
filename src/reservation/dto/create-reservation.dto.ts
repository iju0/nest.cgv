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

    // @IsNumber()
    // sales_id: number;

    // @IsNumber()
    // sales_film_id: number;

    // @IsNumber()
    // sales_cinema_id: number;

    // @IsNumber()
    // sales_seat_id: number;

    // @IsNumber()
    // bill_id: number;

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
