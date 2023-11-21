import { Expose, Type } from "class-transformer";

class Service {
    @Expose()
    id:number

    @Expose()
    title:string
}

class User{
    // @Expose()
    // id:number

    @Expose()
    name:string
}

class Review{
    @Expose()
    id:number

    @Expose()
    rate:number

    @Expose()
    remark:string

    @Expose()
    @Type(()=>Service)
    service:Service

    @Expose()
    @Type(()=>User)
    user:User
}

export class GetReviewSerializer{
    @Expose()
    @Type(()=>Review)
    data:Review

    // @Expose()
    // total:number
}