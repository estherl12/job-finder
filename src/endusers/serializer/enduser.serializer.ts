import { Expose, Type } from "class-transformer";
import { Column } from "typeorm";

class Enduser{

    @Expose()
    id:number;

    @Expose()
    name:string;

    @Expose()
    email:string;

    password:string;

    @Expose()
    mobile:string;

    accesstoken:string;
    
    // @OneToMany(()=>blogEntity,(blog)=>blog.users)
    // blog:blogEntity

    // @OneToMany(()=>commentEntity,(comments)=>comments.users)
    // comments:commentEntity;
}
export class enduserSerializer{
    @Expose()
    @Type(()=>Enduser)
    data:Enduser

    @Expose()
    total:number;
}