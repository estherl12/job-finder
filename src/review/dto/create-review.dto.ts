import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    
    @ApiProperty()
    service_id:number
    
    @ApiProperty()
    rate:number

    @ApiProperty()
    remark:string

    
}
