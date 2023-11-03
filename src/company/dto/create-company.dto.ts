import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {

    @ApiProperty({description:`Company's name`,type:String})
    name:string;

    @ApiProperty({description:`Company's Location`,type:String})
    location:string;

    @ApiProperty({description:`Company Type`,type:String})
    companytype:string

    @ApiProperty({description:'Company Size',type:String})
    companysize:string


}
