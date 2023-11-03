import { Module } from '@nestjs/common';
import { CareercategoryService } from './careercategory.service';
import { CareercategoryController } from './careercategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Careercategory } from './entities/careercategory.entity';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { EndusersService } from 'src/endusers/endusers.service';
import { EndusersModule } from 'src/endusers/endusers.module';
import { JwtService } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Careercategory,enduser]),
    EndusersModule,
    CompanyModule
  ],
  controllers: [CareercategoryController],
  providers: [CareercategoryService,EndusersService,JwtService],
})
export class CareercategoryModule {}
