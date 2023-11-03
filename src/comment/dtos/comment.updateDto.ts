import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";

export class updateCommentDto{
    id?:number;
    
    @ApiProperty({ description: "Leave us your comment",type: String,example: ""})
    comment:string;
}