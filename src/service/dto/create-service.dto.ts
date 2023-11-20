import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateServiceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    shortDescription:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    servicecategory_id:number;
}
