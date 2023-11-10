import { IsNumber, IsString } from "class-validator";

export class CreateServiceCategoryDto {
    @IsString()
    title:string

    @IsString()
    image:string;

    @IsString()
    description:string

    @IsNumber()
    order:number;

}
