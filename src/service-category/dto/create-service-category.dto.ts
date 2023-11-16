import { IsNotEmpty, IsNumber, IsString, Length, MinLength } from "class-validator";

export class CreateServiceCategoryDto {
    @IsString()
    // @Length(8,20,{message:"length must be minimum 8 character"})
    @IsNotEmpty()
    title:string

    @IsString()
    @IsNotEmpty()
    image:string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    description:string

    @IsNumber()
    // @IsNotEmpty()
    order:number;

}
