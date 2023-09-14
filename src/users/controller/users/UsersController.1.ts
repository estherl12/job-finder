import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import path from 'path';
import { bloginterface } from 'src/models/user.interface';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('blogs')
@ApiConsumes('multipart/form-data')
export class UsersController {
  SERVER_URL = 'http://localhost:3005/';
  constructor(private blogService: UsersService) {}

  @Post('add')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, image, callback) => {
          const uniqueSuffix = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const ext = extname(image.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiBody({ type: bloginterface })
  
  createBlog(
    @Body() blog: bloginterface,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<bloginterface> {
    console.log(image);
    
    console.log(image.path);
    blog.image = `${this.SERVER_URL}${image.path}`;
    return this.blogService.createBlog(blog);
  }

  @Get('list/:id')
  @ApiConsumes('multipart/form-data')
  findOneblog(@Param('id') id: string): Promise<bloginterface> {
    return this.blogService.findOne(Number(id));
  }

  @Get('list')
  @ApiConsumes('multipart/form-data')
  listAll(): Promise<bloginterface[]> {
    return this.blogService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<any> {
    return this.blogService.deleteOne(Number(id));
  }

  

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  updateOne(
    @Param('id') id: string,
    @Body() blog: bloginterface,
  ): Promise<any> {
    return this.blogService.updateOne(Number(id), blog);
  }
}
