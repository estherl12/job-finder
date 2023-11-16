import { ApiProperty } from "@nestjs/swagger"
import { Cms } from "../entities/cm.entity"
import { IsNotEmpty } from "class-validator"

export class CreateCmDto {
    // @ApiProperty({description:'title',type:String})
    @IsNotEmpty()
    title:string

    // @ApiProperty({description:'description',type:String})
    @IsNotEmpty()
    description:string

    // @ApiProperty({description:'image',format:'binary',type:String})
    @IsNotEmpty()
    image:string

    // @ApiProperty({description:'metadescription',type:String})
    @IsNotEmpty()
    metadescription:string

//    @ApiProperty({description:'parent_id',type:Number,required:false})
    children:Cms[]
}
