import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { BlogController } from './controller/blog/Blog.controller';
import { BlogService } from './services/users/blog.service';
import { AuthModule } from 'src/auth/auth.module';
import { blogEntity } from './entities/blog.entity';
import { categoryentity } from 'src/category/Entity/category.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([blogEntity, categoryentity]),
    CategoryModule,
    AuthModule
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogsModule {}
