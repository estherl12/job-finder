import { ApiProperty, PartialType } from "@nestjs/swagger";
import { createEndUserDto } from "./enduser.dto";

export class EmployerDto extends PartialType(createEndUserDto) {
    @ApiProperty({description:`company's id`,type:Number})
    company_id:number;
}
