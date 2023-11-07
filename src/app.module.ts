import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import multer from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './users/blog.module';
import { EndusersModule } from './endusers/endusers.module';
import { PassportModule } from '@nestjs/passport';
import { CommentModule } from './comment/comment.module';
import { commentEntity } from './comment/entity/comment.entity';
import { AbcdModule } from './abcd/abcd.module';
import { categoryentity } from './category/Entity/category.entities';
import { enduser } from './endusers/entities/endusers.entity';
import { blogEntity } from './users/entities/blog.entity';
import { CareercategoryModule } from './careercategory/careercategory.module';
import { Careercategory } from './careercategory/entities/careercategory.entity';
import { CareervacancyModule } from './careervacancy/careervacancy.module';
import { CareerapplicationsModule } from './careerapplications/careerapplications.module';
import { Careervacancy } from './careervacancy/entities/careervacancy.entity';
import { Careerapplication } from './careerapplications/entities/careerapplication.entity';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/company.entity';
import { CmsModule } from './cms/cms.module';
import { Cms } from './cms/entities/cm.entity';

@Module({
  imports: [
    BlogsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mypassword',
      database: 'blog',
      entities: [
        blogEntity,
        categoryentity,
        enduser,
        commentEntity,
        Careercategory,
        Careervacancy,
        Careerapplication,
        Company,
        Cms
      ],
      synchronize: true,
      autoLoadEntities: true, // every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
    }),
    MulterModule.register({ dest: './files' }), //for image showing into browser
    // MulterModule.register({ dest: './cvupload' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'), //for image showing
    }),
    CategoryModule,
    PassportModule,
    AuthModule,
    EndusersModule,
    CommentModule,
    AbcdModule,
    CareercategoryModule,
    CareervacancyModule,
    CareerapplicationsModule,
    CompanyModule,
    CmsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CommentModule],
})
export class AppModule {}
