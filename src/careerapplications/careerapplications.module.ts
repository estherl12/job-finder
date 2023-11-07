import { Module } from '@nestjs/common';
import { CareerapplicationsService } from './careerapplications.service';
import { CareerapplicationsController } from './careerapplications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Careerapplication } from './entities/careerapplication.entity';
import { Careervacancy } from 'src/careervacancy/entities/careervacancy.entity';
import { CareervacancyService } from 'src/careervacancy/careervacancy.service';
import { CareervacancyModule } from 'src/careervacancy/careervacancy.module';
import { CareercategoryModule } from 'src/careercategory/careercategory.module';
import { Careercategory } from 'src/careercategory/entities/careercategory.entity';
import { CareercategoryService } from 'src/careercategory/careercategory.service';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { EndusersService } from 'src/endusers/endusers.service';
import { JwtService } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports:[
  TypeOrmModule.forFeature([Careerapplication,Careervacancy,Careercategory,enduser]),
  CareervacancyModule,
  CompanyModule,
  CareercategoryModule
],
  controllers: [CareerapplicationsController],
  providers: [CareerapplicationsService,CareervacancyService,CareercategoryService,EndusersService,JwtService],
})
export class CareerapplicationsModule {}
