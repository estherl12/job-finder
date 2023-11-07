import { ApiProperty } from "@nestjs/swagger"

export class CreateCmDto {
    
    @ApiProperty({description:'title',type:String})
    title:string

    @ApiProperty({description:'description',type:String})
    description:string

    @ApiProperty({description:'image',format:'binary',type:String})
    image:string

    @ApiProperty({description:'metadescription',type:String})
    metadescription:string

   @ApiProperty({description:'parent_id',type:Number,required:false})
    parent_id:number
}
