import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length, isEmail, isStrongPassword } from "class-validator";
import { Role } from "src/auth/enum/role.enum";

export class createEndUserDto {

    
   @ApiProperty({ description: "Person's Name",type: String,example: ""})
//    @Length(5,20,{message:"name must be  of atleast 5 letters"})
   name: string;

   @ApiProperty({description: "Email Address",type: String,example: "", })
   @IsEmail()
   @Length(5,20,{message:"email address must be at least 5 letters"})
   email: string;

   @ApiProperty({description: "Enter Password",type: String,example:"", })
   @Length(5,20,{message:"password must be  of atleast 5 letters"})
   password: string;

   @ApiProperty({description: "Confirm Password",type: String,example:"", })
   RetypePassword: string;

    // @ApiProperty({ description: "Contact No.", type: String, example: " add your contact number", })
    @ApiProperty({ description: "Contact No.", type: String, example: "", })
    @Length(10,10,{message:"number must be 10 digits"})
    mobile: string;
   
   //  @ApiProperty({description:'role',type:String})
   //  role:Role;
}

