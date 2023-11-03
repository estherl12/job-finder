import { Module, forwardRef } from '@nestjs/common';
import { EndusersService } from './endusers.service';
import { EndusersController } from './endusers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { enduser } from './entities/endusers.entity';
import { CompanyModule } from 'src/company/company.module';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { CareercategoryModule } from 'src/careercategory/careercategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([enduser, Company]),
    // forwardRef(() => CompanyModule),
    // forwardRef(() =>CareercategoryModule ),
    AuthModule,
    PassportModule,
    JwtModule,
    CompanyModule
  ],
  providers: [EndusersService],
  controllers: [EndusersController],
  exports: [EndusersService],
})
export class EndusersModule {}
