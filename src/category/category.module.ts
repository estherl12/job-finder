import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { categoryentity } from './Entity/category.entities';

@Module({
  imports:[TypeOrmModule.forFeature([categoryentity]),
  AuthModule

],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
