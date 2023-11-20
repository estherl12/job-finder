import { Module } from '@nestjs/common';
import { ServiceBookingService } from './service-booking.service';
import { ServiceBookingController } from './service-booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceBooking } from './entities/service-booking.entity';
import { EndusersModule } from 'src/endusers/endusers.module';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { Service } from 'src/service/entities/service.entity';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports:[TypeOrmModule.forFeature([ServiceBooking,enduser,Service]),EndusersModule,ServiceModule],
  controllers: [ServiceBookingController],
  providers: [ServiceBookingService],
})
export class ServiceBookingModule {}
