import { Module } from '@nestjs/common';
import { CareervacancyService } from './careervacancy.service';
import { CareervacancyController } from './careervacancy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Careervacancy } from './entities/careervacancy.entity';
import { Careerapplication } from 'src/careerapplications/entities/careerapplication.entity';
import { CareercategoryService } from 'src/careercategory/careercategory.service';
import { Careercategory } from 'src/careercategory/entities/careercategory.entity';
import { CareercategoryModule } from 'src/careercategory/careercategory.module';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { EndusersModule } from 'src/endusers/endusers.module';
import { EndusersService } from 'src/endusers/endusers.service';
import { JwtService } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Careervacancy,Careerapplication,Careercategory,enduser,Company] ),
    CareercategoryModule,EndusersModule,CompanyModule],
  controllers: [CareervacancyController],
  providers: [CareervacancyService,CareercategoryService,JwtService,CompanyService],
  exports:[CareervacancyService]
})
export class CareervacancyModule {}
