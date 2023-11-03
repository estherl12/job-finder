import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";

export class commentDto{
    id?:number;
    
    @ApiProperty({ description: "Blog Id ",type:Number,example: ""})
    blog_id:number;
    
    @ApiProperty({ description: "Leave us your comment",type: String,example: ""})
    comment:string;
}