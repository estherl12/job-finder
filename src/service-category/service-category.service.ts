import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceCategoryService {
  constructor(@InjectRepository(ServiceCategory) private readonly categoryRepo:Repository<ServiceCategory>){}
  async create(createServiceCategoryDto: CreateServiceCategoryDto):Promise<ServiceCategory> {
    const category = new ServiceCategory();
    category.title = createServiceCategoryDto.title;
    category.image = createServiceCategoryDto.image;
    category.description = createServiceCategoryDto.description;
    category.order = createServiceCategoryDto.order;

    return await this.categoryRepo.save(category);
  }

  async findAll() {
    const data = await this.categoryRepo.find();
    if(!data){
      throw new NotFoundException("Data empty")
    }
    return data
  }

  async findOne(id: number) {
    const data =  await this.categoryRepo.findOne({where:{id:id}})
    if(!data){
      throw new NotFoundException("Data not found with given parameter")
    }
    return data;
  }
  async findWithServices(id: number) {
    return await this.categoryRepo.findOne({where:{id:id},relations:{service:true}})
  }
  async update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    const category = await this.categoryRepo.findOne({where:{id:id}})
    if(!category){
      throw new NotFoundException("Data not found for updation")
    }
    Object.assign(category,updateServiceCategoryDto)
    return await this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const item = await this.categoryRepo.findOne({where:{id:id}})
    if(!item){
      throw new NotFoundException("Data not found for deletion")
    }

    return await this.categoryRepo.delete(id);
  }
}
