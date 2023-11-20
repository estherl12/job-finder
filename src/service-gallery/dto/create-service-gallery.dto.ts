import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceGalleryDto {
    
    @ApiProperty({type:String,format:'binary',description:"Upload Image"})
    image:string;

    @ApiProperty({type:Number,description:'Service Id'})
    service_id:number
}
