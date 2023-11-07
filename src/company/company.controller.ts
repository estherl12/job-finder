import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { EndusersService } from 'src/endusers/endusers.service';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags('Career-Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(+id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiBody({ type: CreateCompanyDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    console.log(createCompanyDto);
    const company = await this.companyService.create(createCompanyDto);
    return {
      status: 200,
      message: 'Successfully created',
      company: company,
    };
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiBody({ type: CreateCompanyDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const data =  await this.companyService.update(+id, updateCompanyDto);
    console.log(data);
    console.log(updateCompanyDto);
    
    return {
      status:200,
      message:'updated successfully',
      company:data
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const deleted = await this.companyService.remove(+id);
    return {
      status: 200,
      message: 'Company Deleted Successfully',
    };
  }
}
