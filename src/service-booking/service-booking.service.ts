import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceBookingDto } from './dto/create-service-booking.dto';
import { UpdateServiceBookingDto } from './dto/update-service-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBooking } from './entities/service-booking.entity';
import { Repository } from 'typeorm';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { ServiceService } from 'src/service/service.service';
import { identity } from 'rxjs';

@Injectable()
export class ServiceBookingService {
  constructor(@InjectRepository(ServiceBooking) private serviceBooking:Repository<ServiceBooking>,
  private services:ServiceService){}

  async create(createServiceBookingDto: CreateServiceBookingDto,user:enduser) {
  const service = await this.services.findOne(createServiceBookingDto.service_id)
   const booking = new ServiceBooking()
   booking.message = createServiceBookingDto.message
   booking.email = user.email;
   booking.mobile = user.mobile;
   booking.name = user.name;
   booking.service = service;
   booking.user = user;

   return await this.serviceBooking.save(booking);
  }

  async findAll() {
    return await this.serviceBooking.find();
  }

  async findOne(id: number) {
    return await this.serviceBooking.findOne({where:{id:id},relations:{service:true}})
  }

  async update(id: number, updateServiceBookingDto: UpdateServiceBookingDto,user:enduser) {

    const booking = await this.serviceBooking.findOne({where:{id:id},relations:{user:true}})
    if(!booking){
      throw new NotFoundException("Not found")
    }
   
    if(booking.user.email!=user.email){
    throw new ForbiddenException("Forbidden for further action")      
    }
    booking.message = updateServiceBookingDto.message ;

    return await this.serviceBooking.save(booking);
  }

  async remove(id: number,user:enduser) {
    const booking = await this.serviceBooking.findOne({where:{id:id},relations:{user:true}})
    if(!booking){
      throw new NotFoundException("Not found")
    }
   
    if(booking.user.email!=user.email){
    throw new ForbiddenException("Forbidden for further action")      
    }
    return await this.serviceBooking.delete(id);
  }
}
