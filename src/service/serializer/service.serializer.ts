import { Expose, Type } from "class-transformer";

 class ServiceCategory{
    @Expose()
    title:string
    
    // @Expose()
    // image:string;

    // @Expose()
    // description:string

    // @Expose()
    // order:number;
}
 class User{
    
    @Expose()
    name:string;

    @Expose()
    email:string;

    @Expose()
    mobile:string;

}
 class Review{
    @Expose()
    rate:number

    @Expose()
    remark:string;

    @Type(()=>User)
    @Expose()
    user:User;
}
 class ServiceBooking{
    @Expose()
    name:string;

    @Expose()
    email:string;

    @Expose()
    mobile:string;

    // @Column()
    // address:string;

    @Expose()
    message:string;

    @Expose()
    @Type(()=>User)
    user:User;

}
class ServiceGallery{
    @Expose()
    image:string
}
 class Service{
@Expose()
id:number;

@Expose()
title:string;

@Expose()
shortDescription:string;

@Expose()
description:string

@Expose()
image:string;

@Expose()
averagerate:number;

@Expose()
@Type(()=>ServiceCategory)
servicecategory:ServiceCategory

@Expose()
@Type(()=>ServiceBooking)
booking:ServiceBooking[]

@Expose()
@Type(()=>Review)
review:Review[]

@Expose()
@Type(()=>ServiceGallery)
gallery:ServiceGallery[]
}

export class ServiceSerializer{
    @Expose()
    @Type(()=>Service)
    data:Service

    @Expose()
    message:String

    @Expose()
    total:number

   
}