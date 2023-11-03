import { ApiProperty } from "@nestjs/swagger";

export class loginDto {

    @ApiProperty({description: "Email Address",type: String,example: "", })
    email: string;
 
    @ApiProperty({description: "Password",type: String,example: "", })
    password: string;
 
    
 }