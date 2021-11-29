import { IsNotEmpty } from "class-validator";

export class CreateGenreDto {
    
    id : number;
    
    @IsNotEmpty()
    name : string;
}