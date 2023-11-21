import { plainToClass } from 'class-transformer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  ParseFilePipe,
  UseGuards,
  ForbiddenException,
  SerializeOptions,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
// import { bloginterface, updateDto } from 'src/models/blog.interface';
import { blogSerializer } from 'src/users/serialzier/user.serializer';
import { BlogService } from 'src/users/services/users/blog.service';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { categoryentity } from 'src/category/Entity/category.entities';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { blogEntity } from 'src/users/entities/blog.entity';
import { CreateBlogDto } from 'src/users/dtos/blog.createdto';
import { BlogUpdateDto } from 'src/users/dtos/blog.updatedto';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';

@ApiTags('Blogs') //blogs-api tags for below apis
@Controller('blogs')
// @SerializeOptions({ strategy: 'excludeAll' })
@ApiConsumes('multipart/form-data')
export class BlogController {
  SERVER_URL = 'http://localhost:3005/';
  constructor(
    @InjectRepository(categoryentity)
    private readonly categoryRepo: Repository<categoryentity>,
    private blogService: BlogService,
  ) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateBlogDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          const filename = ` ${file.originalname}` + uuid() + `${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createBlog(
    @Body() blog,
    @CurrentUser() endUser: enduser, //this indicates the current user from token
    @UploadedFile() image: Express.Multer.File,
  ){
    blog.image = `${this.SERVER_URL}${image.filename}`;

    const blogCreated =  await this.blogService.createBlog(blog, endUser);
     delete blogCreated.users.password
     delete blogCreated.users.accesstoken
     delete blogCreated.users.mobile

    return blogCreated;
  }

  @Get(':id')
  @ApiConsumes('multipart/form-data')

  async findOneblog(@Param('id') id: string) {
    const blogFromRepo = await this.blogService.findOne(Number(id));
    if(!blogFromRepo){
      throw new BadRequestException("No blog found with given id")
    }
    // console.log(blogFromRepo.comments);
    
    return plainToClass(
      blogSerializer,
      {
        blog: blogFromRepo,
      },
      { strategy: 'excludeAll' },
    );
  }

  @Get()
  @ApiConsumes('multipart/form-data')
  async listAll(): Promise<any> {
    const [blogs,count] = await this.blogService.findAll();

    return plainToClass(
      blogSerializer,
      {
        blog: blogs,
        total:count
      },
      { strategy: 'excludeAll' },
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  async deleteOne(
    @Param('id') id: number,
    @CurrentUser() endUser: enduser,
  ): Promise<any> {
   
    const deleted = this.blogService.deleteOne(Number(id),endUser);

    return {
      status: '200',
      message: 'deleted successfull',
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: BlogUpdateDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          const filename = ` ${file.originalname}` + uuid() + `${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async updateOne(
    @Param('id') id: number,
    @Body() Blog,
    @CurrentUser() endUser: enduser,
    @UploadedFile() image: Express.Multer.File,
  ){
    const blogfind = await this.blogService.findOne(Number(id));
    console.log(endUser);
    console.log(blogfind.users);
    
    if (blogfind.enduserId != endUser.id) {
      throw new ForbiddenException('Your are forbidden');
    }

    Blog.image = `${this.SERVER_URL}${image.filename}`;

    const updatedBlog = await this.blogService.updateOne(id, Blog);
    return {
      message:"Updated Blog successfully",
      data:updatedBlog
    }
  }
}
