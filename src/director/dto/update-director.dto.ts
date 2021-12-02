import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDirectorDto{
    @IsString()
    @IsNotEmpty()
    name: string;
}