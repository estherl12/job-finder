import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    title:string;
    
    @IsNotEmpty()
    @IsString()
    shortDescription:string;
    
    @IsNotEmpty()
    @IsString()
    description:string
    
    @IsNotEmpty()
    @IsString()
    image:string;

    @IsNotEmpty()
    @IsNumber()
    servicecategory_id:number;
}
