import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoryentity } from 'src/models/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([categoryentity])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
