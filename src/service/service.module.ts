import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceCategoryService } from 'src/service-category/service-category.service';
import { ServiceCategoryModule } from 'src/service-category/service-category.module';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { Review } from 'src/review/entities/review.entity';
import { ServiceBooking } from 'src/service-booking/entities/service-booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Service,ServiceCategory,enduser,Review,ServiceBooking]),ServiceCategoryModule],
  controllers: [ServiceController],
  providers: [ServiceService,ServiceCategoryService],
  exports:[ServiceService]
})
export class ServiceModule {}
