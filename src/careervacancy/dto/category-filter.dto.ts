import { ApiProperty } from "@nestjs/swagger";

export class FilterCategoryDto{
    @ApiProperty({description:'Category',type:String})
    category:string
}