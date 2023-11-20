import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ServiceService } from 'src/service/service.service';
import { Service } from 'src/service/entities/service.entity';
import { ServiceModule } from 'src/service/service.module';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { EndusersModule } from 'src/endusers/endusers.module';

@Module({
  imports:[TypeOrmModule.forFeature([Review,Service,enduser]),ServiceModule,EndusersModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
