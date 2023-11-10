import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Services-Category")
@Controller('service-category')
export class ServiceCategoryController {
  constructor(private readonly serviceCategoryService: ServiceCategoryService) {}

  @Post()
  async create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    const category = await this.serviceCategoryService.create(createServiceCategoryDto);
    return {
      message:"Service Category successfully created.",
      data:category
    }
  }

  @Get()
  async findAll() {
    const data= await  this.serviceCategoryService.findAll();
    return {
      message:"Data fetched successully",
      data:data
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.serviceCategoryService.findOne(+id);
    return {
      message:"Data fetched successfully",
      data:data
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceCategoryDto: UpdateServiceCategoryDto) {
    const category =   await this.serviceCategoryService.update(+id, updateServiceCategoryDto);
    return {
      message:"Updated successfully",
      data:category
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.serviceCategoryService.remove(+id);
    return {
      message:"deleted successfully"
    }
  }
}
