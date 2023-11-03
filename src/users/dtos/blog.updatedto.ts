import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './blog.createdto';

// export class BlogUpdateDto extends PartialType(CreateBlogDto) {}
export class BlogUpdateDto extends CreateBlogDto{}

