import { Module, forwardRef } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { EndusersModule } from 'src/endusers/endusers.module';
import { EndusersService } from 'src/endusers/endusers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
