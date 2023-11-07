import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCareercategoryDto } from './dto/create-careercategory.dto';
import { UpdateCareercategoryDto } from './dto/update-careercategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Careercategory } from './entities/careercategory.entity';
import { NotFoundError } from 'rxjs';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class CareercategoryService {
  constructor(
    @InjectRepository(Careercategory) private readonly careerCategoryRepo:Repository<Careercategory>
    ){}

  async create(createCareercategoryDto: CreateCareercategoryDto,user:enduser) {
    const category = new Careercategory()
    category.sector = createCareercategoryDto.sector;
    category.user = user
    return await this.careerCategoryRepo.save(category); 
    }

  async findAll() {
    return await this.careerCategoryRepo.findAndCount();
  }

  async findOneWithVacancy(id: number) {
    const category = await this.careerCategoryRepo.findOne({
      where:{id:id},
      relations:{vacancy:true}
    })
    if(!category){
      throw new NotFoundException("Category not found")
    }
    return category;
  }

  async findOne(id: number) {
    const category = await this.careerCategoryRepo.findOne({
      where:{id:id},
    })
    if(!category){
      throw new NotFoundException("Category not found")
    }
    return category;
  }

  async update(id: number, updateCareercategoryDto: UpdateCareercategoryDto,user:enduser) {
    const category = await this.careerCategoryRepo.findOne({where:{id:id}})
   
   if(user.role!=Role.Admin){
    throw new ForbiddenException("forbidden to update");
  }
    // if(category.user.email!=user.email){  //in js, object equality done through reference so
    //   throw new ForbiddenException("forbidden to update")
    // }
   category.sector = updateCareercategoryDto.sector
    return await this.careerCategoryRepo.save({...category,...updateCareercategoryDto});
  }

  async remove(id: number,user:enduser) {
    const category = await this.careerCategoryRepo.findOne({where:{id:id},relations:{user:true}},)
   if(!category){
    throw new NotAcceptableException('category not found')
   }
    // if(category.user.email!=user.email){ 
    //   throw new ForbiddenException("forbidden to update");
    // }
    if(user.role!=Role.Admin){
      throw new ForbiddenException("forbidden to update");
    }
    return await this.careerCategoryRepo.delete(id);
  }
}
