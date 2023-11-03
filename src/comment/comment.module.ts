import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commentEntity } from './entity/comment.entity';
import { EndusersModule } from 'src/endusers/endusers.module';
import { BlogsModule } from 'src/users/blog.module';
import { blogEntity } from 'src/users/entities/blog.entity';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { CompanyModule } from 'src/company/company.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([commentEntity,blogEntity,enduser]),
        EndusersModule,
        CompanyModule,
        BlogsModule
    ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {
    
}
