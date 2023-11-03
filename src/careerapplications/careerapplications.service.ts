import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCareerapplicationDto } from './dto/create-careerapplication.dto';
import { UpdateCareerapplicationDto } from './dto/update-careerapplication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Careerapplication } from './entities/careerapplication.entity';
import { CareervacancyService } from 'src/careervacancy/careervacancy.service';
import { enduser } from 'src/endusers/entities/endusers.entity';

@Injectable()
export class CareerapplicationsService {
  constructor(
  @InjectRepository(Careerapplication) 
  private readonly applicants:Repository<Careerapplication>,
  private vacancyService:CareervacancyService,
  ){}
  async create(createCareerapplicationDto: CreateCareerapplicationDto):Promise<Careerapplication> {
    const vacancyFind = await this.vacancyService.findOne(createCareerapplicationDto.vacancy_id);
    if(!vacancyFind){
      throw new NotFoundException("Vacancy not found")
    }
    const applicant = new Careerapplication();
    applicant.name = createCareerapplicationDto.name;
    applicant.email = createCareerapplicationDto.email;
    applicant.file = createCareerapplicationDto.file;
    applicant.vacancy = vacancyFind
    return await this.applicants.save(applicant);
  }

  async findAll() {
   return await this.applicants.findAndCount({relations:{vacancy:true}});
  }

  async findOne(id: number) {
    const data =await this.applicants.find({
      where:{id:id},
      relations:{vacancy:true}
    });
    if(!data){
      throw new NotFoundException("Applicant Not Found")
    }
    return data;
  }

  async update(id: number, updateCareerapplicationDto: UpdateCareerapplicationDto,user:enduser) {
    const vacancy = await this.vacancyService.findOne(updateCareerapplicationDto.vacancy_id);

    const applicant = await this.applicants.findOne({
      where:{id:id},
      relations:{user:true}
    })
    if(!applicant){
      throw new NotFoundException("Applicant Not Found with this id")
    }
    if(applicant.user.id!=user.id){
      throw new ForbiddenException("Forbidden to use this")
    }
    applicant.name = updateCareerapplicationDto.name;
    applicant.email = updateCareerapplicationDto.email;
    applicant.file = updateCareerapplicationDto.file;
    applicant.vacancy = vacancy;

    return await this.applicants.save({...applicant,...updateCareerapplicationDto});
  }

  async remove(id: number,user:enduser) {
    
    const applicant = await this.applicants.findOne({
      where:{id:id},
      relations:{user:true}
    })
    if(applicant.user.id!=user.id){ 
      throw new ForbiddenException("forbidden to update");
    }
    if(!applicant){
      throw new NotFoundException("Applicant Not Found with this id")
    }
    return await this.applicants.delete(id);
  }
}
