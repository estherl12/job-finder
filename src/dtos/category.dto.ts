import { ApiProperty } from "@nestjs/swagger";

export class createCateDto{
    @ApiProperty()
    id:number;

    @ApiProperty()
    name:string
}