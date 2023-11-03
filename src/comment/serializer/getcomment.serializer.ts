import { Expose, Type } from 'class-transformer';

class Blog {
  @Expose()
  id: number;
}
class User {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class Comments {
  @Expose()
  id: number;

  @Expose()
  comment: string;

  @Expose()
  @Type(() => Blog)
  blog: Blog;

  @Expose()
  @Type(() => User)
  users: User;
}
export class GetBlogSerializer {
  @Expose()
  @Type(() => Comments)
  data: Comments;
  @Expose()
  total:number
}
