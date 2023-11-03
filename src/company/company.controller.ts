import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { EndusersService } from 'src/endusers/endusers.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
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

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateCompanyDto })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.companyService.remove(+id);
    return {
      status: 200,
      message: 'Company Deleted Successfully',
    };
  }
}
