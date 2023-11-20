import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length, MinLength } from "class-validator";

export class CreateServiceCategoryDto {
    @ApiProperty() 
    @IsString()
    // @Length(8,20,{message:"length must be minimum 8 character"})
    @IsNotEmpty()
    title:string

    @ApiProperty() 
    @IsString()
    @IsNotEmpty()
    image:string;

    @ApiProperty() 
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    description:string

    @ApiProperty() 
    @IsNumber()
    // @IsNotEmpty()
    order:number;

}
