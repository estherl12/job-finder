import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ServiceCategoryService } from 'src/service-category/service-category.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private readonly serviceRepo:Repository<Service>,
    private categoryServices : ServiceCategoryService
    ){}
  async create(createServiceDto: CreateServiceDto) {
    const category = await this.categoryServices.findOne(createServiceDto.servicecategory_id)

    const service = new Service()
    service.title = createServiceDto.title
    service.description = createServiceDto.description 
    service.image = createServiceDto.image
    service.shortDescription = createServiceDto.shortDescription
    service.servicecategory = category;

    return await this.serviceRepo.save(service);

  }

  async findAll() {
    return await this.serviceRepo.find();
  }

 async findOne(id: number) {
    return await this.serviceRepo.findOne({where:{id:id},relations:{servicecategory:true}})
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepo.findOne({where:{id:id}})
    Object.assign(service,updateServiceDto)
  }

  async remove(id: number) {
    return await this.serviceRepo.delete(id)
  }
}
