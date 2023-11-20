import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty()
    rate:number

    @ApiProperty()
    remark:string

    @ApiProperty()
    service_id:number
    
}
