import { ApiProperty } from "@nestjs/swagger";

export class CreateCareervacancyDto {
    
    @ApiProperty({description:'Give title',type:String})
    title:string;

    @ApiProperty({description:'description',type:String})
    description:string;

    @ApiProperty({description:'requirements',type:String})
    requirement:string;

    @ApiProperty({description:'deadline',type:String})
    deadline:string;

    @ApiProperty({description:'careercategory_id',type:String})
    careercategory_id:string

}
