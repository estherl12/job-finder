import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto{
    id?: number;
  
    @ApiProperty({ description: "Enter Title",type: String,example: ""})
    title: string;
  
    @ApiProperty({ description: "Write desc",type: String,example: ""})
    desc: string;
  
    @ApiProperty({ description: "upload image",format: 'binary',type: String,example: ""})
    image: string;
  
    @ApiProperty({ description: "provide metadata",type: String,example: ""})
    metadata: string;
  
    @ApiProperty({ description: "enter categoryId",type: String,example: ""})
    category_id: number;

}