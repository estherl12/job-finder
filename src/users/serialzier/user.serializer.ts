import { Expose, Type } from 'class-transformer';

class User {
  @Expose()
  name: string;

  @Expose()
 mobile:string;
}

class Category{
    id:number;
    @Expose()
    name:string;
}
class Comment {
    @Expose()
    comment:string;

    @Expose()
    @Type(() => User)
    users: User;
}

class Blog {
    @Expose()
    id:number;

    @Expose()
    title:string;
    
    @Expose()
    desc:string;

    @Expose()
    image:string;

    @Expose()
    metadata:string;

    @Expose()
    @Type(()=>Category)
    category:Category

    @Expose()
    @Type(() => Comment)
    comments: Comment;

  
}

export class blogSerializer {  
    @Expose()
    @Type(() => Blog)
    blog: Blog;

    @Expose()
    total:number
  }
   


