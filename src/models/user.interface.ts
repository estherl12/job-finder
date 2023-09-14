import { ApiProperty } from "@nestjs/swagger";

export class bloginterface{
    @ApiProperty()
    id?:number;

    @ApiProperty()
    title:string;

    @ApiProperty()
    desc:string;

    @ApiProperty()
    image:string;

    @ApiProperty()
    metadata:string



}