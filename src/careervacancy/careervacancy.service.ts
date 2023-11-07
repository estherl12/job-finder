import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCareervacancyDto } from './dto/create-careervacancy.dto';
import { UpdateCareervacancyDto } from './dto/update-careervacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Careervacancy } from './entities/careervacancy.entity';
import { Repository } from 'typeorm';
import { CareercategoryService } from 'src/careercategory/careercategory.service';
import { FilterCategoryDto } from './dto/category-filter.dto';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CareervacancyService {
  constructor(
    @InjectRepository(Careervacancy) private vacancies:Repository<Careervacancy>,
    @InjectRepository(enduser) private enduserRepo:Repository<enduser>,
    private careercategoryService:CareercategoryService,
    private companyService:CompanyService

  ){}
  async create(createCareervacancyDto: CreateCareervacancyDto,user:enduser) {

    const category = await this.careercategoryService.findOne(+createCareervacancyDto.careercategory_id)
    
    if(!category){
      throw new NotAcceptableException('category with given id is not available')
    }
    const company = await this.companyService.findOne(+createCareervacancyDto.company_id)
    if(!company){
      throw new NotAcceptableException('company not found')
    }
    const vacancy = new Careervacancy();
    vacancy.title = createCareervacancyDto.title;
    vacancy.description = createCareervacancyDto.description
    vacancy.requirement = createCareervacancyDto.requirement
    vacancy.deadline = createCareervacancyDto.deadline
    vacancy.careercategory = category
    vacancy.user = user
    vacancy.company = company
    const newvacancy = await this.vacancies.save(vacancy);

    return newvacancy;
    
  }

  async findAll() {
    return await this.vacancies.findAndCount();
  }

  async filteredVacancy(category:FilterCategoryDto){
      
  }

  async findOneWithRelations(id: number) {
    const vacancy = await this.vacancies.findOne({
      where:{id:id},
      relations:{careercategory:true,applicants:true}
    })
    const arr = vacancy.applicants
    if(!vacancy){
      throw new NotFoundException("Applicant Not Found with this id")
 }
    return vacancy;
  }

  async findOne(id: number) {
    const vacancy = await this.vacancies.findOne({
      where:{id:id},
        })
    if(!vacancy){
          throw new NotFoundException("Vacancy Not Found with this id")
     }
    return vacancy;
  }

  async update(id: number, updateCareervacancyDto: UpdateCareervacancyDto,user:enduser) {
    const category = await this.careercategoryService.findOne(+updateCareervacancyDto.careercategory_id)

    const vacancy = await this.vacancies.findOne({
      where:{id:id},
      relations:{user:true}
    })
    

    // console.log(vacancy.user);
    
    if(!vacancy){
      throw new NotFoundException('Vacancy Not Found')
    }
    if(user.email!=vacancy.user.email){
      throw new ForbiddenException('Forbidden access for further action')
    }
    vacancy.title = updateCareervacancyDto.title
    vacancy.description = updateCareervacancyDto.description
    vacancy.requirement = updateCareervacancyDto.requirement
    vacancy.deadline = updateCareervacancyDto.deadline
    vacancy.careercategory = category;

    return await this.vacancies.save(vacancy);
  }

  async remove(id: number,user:enduser) {
    const data = await this.vacancies.findOne({where:{id:id}})
    
    if(!data){
      throw new NotFoundException('vacancy not found')
    }
    // if(data.user!=user){
    //   throw new ForbiddenException('Forbidden for further action.')
    // }
    console.log(data.user);
    console.log(user);
    
    
    return await this.vacancies.delete(id);
  }
}
