import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const service = await this.serviceService.create(createServiceDto);
    return {
      message: 'service created successfully',
      data: service,
    };
  }

  @Get()
  async findAll() {
    const data = await this.serviceService.findAll();
    return {
      message: 'data fetched successfully',
      data: data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.serviceService.findOne(+id);
    return {
      message: 'data fetched successfully',
      data: data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const data = await this.serviceService.update(+id, updateServiceDto);
    return {
      message: 'updated successfully',
      data: data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.serviceService.remove(id);
    return {
      message: 'deleted successfully',
    };
  }
}
