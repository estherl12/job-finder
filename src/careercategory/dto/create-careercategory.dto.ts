import { ApiProperty } from "@nestjs/swagger";

export class CreateCareercategoryDto {
    @ApiProperty({type:String,name:'sector'})
    sector:string
}
