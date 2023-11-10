import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceCategoryService } from 'src/service-category/service-category.service';
import { ServiceCategoryModule } from 'src/service-category/service-category.module';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Service,ServiceCategory]),ServiceCategoryModule],
  controllers: [ServiceController],
  providers: [ServiceService,ServiceCategoryService],
})
export class ServiceModule {}
