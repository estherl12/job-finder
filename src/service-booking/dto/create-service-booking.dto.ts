import { ApiProperty } from "@nestjs/swagger"

export class CreateServiceBookingDto {
    @ApiProperty({type:String,description:"Enter you message that you want to provide"})
    message:string

    @ApiProperty({type:Number,description:'service id to book'})
    service_id:number
}
