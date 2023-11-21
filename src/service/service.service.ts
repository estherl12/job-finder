import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ServiceCategoryService } from 'src/service-category/service-category.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    private categoryServices: ServiceCategoryService,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const category = await this.categoryServices.findOne(
      createServiceDto.servicecategory_id,
    );

    const service = new Service();
    service.title = createServiceDto.title;
    service.description = createServiceDto.description;
    service.image = createServiceDto.image;
    service.shortDescription = createServiceDto.shortDescription;
    service.servicecategory = category;

    return await this.serviceRepo.save(service);
  }

  async findAll() {
    return await this.serviceRepo.find();
  }

  async findOne(id: number) {
    const service = await this.serviceRepo.findOne({
      where: { id: id },
      relations: { servicecategory: true ,review:true,booking:true,gallery:true},
    });
    if(!service){
      throw new NotFoundException("Service not found!")
    }
    // console.log(service.revie);
    
    return service;
  }
  async findById(id:number){
    const service = await this.serviceRepo.findOne({where:{id:id}});
    
    return service ;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const category = await this.categoryServices.findOne(
      updateServiceDto.servicecategory_id,
    );
    const service = await this.serviceRepo.findOne({ where: { id: id } });
    if(!service){
      throw new NotFoundException("Service not found!")
    }

    service.title = updateServiceDto.title;
    service.description = updateServiceDto.description;
    service.image = updateServiceDto.image;
    service.shortDescription = updateServiceDto.shortDescription;
    service.servicecategory = category;
    
    return await this.serviceRepo.save(service)
  }

  async updateForRate(id:number,rate:number){
    const service = await this.serviceRepo.findOne({ where: { id: id } });
    if(!service){
      throw new NotFoundException("Service not found!")
    }
    service.averagerate = rate
    return await this.serviceRepo.save(service)
  }
  
  async remove(id: number) {
    const service = await this.serviceRepo.findOne({ where: { id: id } });
    if(!service){
      throw new NotFoundException("Service not found!")
    }
    return await this.serviceRepo.delete(id);
  }
}
