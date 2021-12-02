import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateDirectorDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(1)
    name: string;
}