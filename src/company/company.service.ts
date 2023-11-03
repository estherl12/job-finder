import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { EndusersService } from 'src/endusers/endusers.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companies: Repository<Company>, // private userService: EndusersService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company();

    company.name = createCompanyDto.name;
    company.companytype = createCompanyDto.companytype;
    company.companysize = createCompanyDto.companysize;
    company.location = createCompanyDto.location;

    return await this.companies.save(company);
  }

  async findAll() {
    return await this.companies.find();
  }

  async findOne(id: number) {
    return await this.companies.findOne({
      where: { id: id },
      relations: { employer: true },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companies.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companies.delete(id);
  }
}
