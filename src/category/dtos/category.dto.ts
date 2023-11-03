import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createCateDto{
    id?: number;

    @ApiProperty()
    @IsString({message:"Please enter a valid name."})
    name:string
}