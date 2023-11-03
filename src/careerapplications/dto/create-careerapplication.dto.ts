import { ApiProperty } from "@nestjs/swagger";

export class CreateCareerapplicationDto {
    @ApiProperty({name:'name',type:String})
    name:string;

    @ApiProperty({name:'email',type:String})
    email:string;

    @ApiProperty({description:'Resume/Cv',format: 'binary',type:String})
    file:string;

    
    @ApiProperty({description:'vacancy_id',type:String})
    vacancy_id:number
    
}
