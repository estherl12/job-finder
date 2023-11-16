import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {

    @ApiProperty({description:'Upload Image',format:'binary',type:String})
    image:string

    // @ApiProperty({description:'Category',example:'cms',type:String})
    // category:string
}
