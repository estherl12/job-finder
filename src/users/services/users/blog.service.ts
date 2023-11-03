import {
  BadRequestException,
  FileTypeValidator,
  ForbiddenException,
  Injectable,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { categoryentity } from 'src/category/Entity/category.entities';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { CreateBlogDto } from 'src/users/dtos/blog.createdto';
import { BlogUpdateDto } from 'src/users/dtos/blog.updatedto';
import { blogEntity } from 'src/users/entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(blogEntity)
    private readonly blogRepository: Repository<blogEntity>,

    @InjectRepository(categoryentity)
    private readonly categoryRepo: Repository<categoryentity>,
  ) {}

  async createBlog(blog: CreateBlogDto, endUser: enduser): Promise<blogEntity> {
   
    const categoryfind = await this.categoryRepo.findOne({
      where: { id: blog.category_id },
    });
    if (!categoryfind) {
      throw new BadRequestException('Category not found');
    }
    const newBlog = new blogEntity();
    newBlog.title = blog.title;
    newBlog.desc = blog.desc;
    newBlog.image = blog.image;
    newBlog.metadata = blog.metadata;
    newBlog.category = categoryfind; //it do not take numbers given to id through postman because it's category is defined as object entity instead of number in our relations
    newBlog.users = endUser;

    return await this.blogRepository.save(newBlog);
  }

  async findAll() {
   return await this.blogRepository.findAndCount({
      relations: ['category', 'users'],
    });
     
  }

  async findOne(id: number): Promise<blogEntity>  {
    const blog = await this.blogRepository.findOne({
      where: { id: id },
      relations: ['comments', 'category'],
    });

    return blog;
  }

  async deleteOne(id: number,endUser: enduser): Promise<any> {
    const blogfind = await this.blogRepository.findOne({where: {id: id}});

    if (blogfind.enduserId != endUser.id) {
      throw new ForbiddenException('Your are forbidden');
    }
    return await this.blogRepository.delete(id);
  }

  async updateOne(id:number, blogUpdate: BlogUpdateDto):Promise<blogEntity> {
    const blogfind = await this.blogRepository.findOne(
      {where:{id:id}}
    );
    const categoryfind = await this.categoryRepo.findOne({
      where: { id: blogUpdate.category_id },
    });
    blogfind.title = blogUpdate.title;
    blogfind.desc = blogUpdate.desc;
    blogfind.metadata = blogUpdate.metadata;
    blogfind.category = categoryfind;
    blogfind.image = blogUpdate.image
    return await this.blogRepository.save({
      ...blogfind,
      ...blogUpdate,
    });

    //we prefer save method over update method for adding validation if needed

    // return await this.blogRepository
    // .createQueryBuilder()
    // .update(blogEntity)
    // .set({
    //   title:blog.title ,
    //   metadata:blog.metadata ,
    //   image:blog.image,
    //   desc:blog.desc,
    //   category:categoryfind
    // })
    // .where('id=:id',{id:id})
    // .execute();
  }
}
