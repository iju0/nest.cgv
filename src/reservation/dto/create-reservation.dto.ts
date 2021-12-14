import { IsString } from "class-validator";

export class CreateReservationDto {

    @IsString()
    serial_number: string;

    @IsString()
    customer_name: string;

    @IsString()
    customer_phone: string;
    sales_id: number;
    sales_film_id: number;
    sales_cinema_id: number;
    sales_seat_id: number;
    bill_id: number;

}
