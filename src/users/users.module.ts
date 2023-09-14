import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { blogEntity } from '../models/user.entity';
import { UsersController } from './controller/users/UsersController.1';
import { categoryentity } from 'src/models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([blogEntity,categoryentity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
