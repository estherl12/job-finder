import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { plainToClass } from 'class-transformer';
import { ServiceSerializer } from './serializer/service.serializer';

@ApiTags('Services')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiExtraModels(CreateServiceDto)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  async create(@Body(ValidationPipe) createServiceDto: CreateServiceDto) {
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
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id',ParseIntPipe) id: number) {

    const data = await this.serviceService.findOne(id);
  
    
    return  plainToClass(ServiceSerializer,{
      data:data,
      message:"Data fetched successfully",
      
    },{strategy:"excludeAll"})
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id',ParseIntPipe) id: number,
    @Body(ValidationPipe) updateServiceDto: UpdateServiceDto,
  ) {
    const data = await this.serviceService.update(+id, updateServiceDto);
    return {
      message: 'updated successfully',
      data: data,
    };
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id',ParseIntPipe) id: number) {
    const data = await this.serviceService.remove(id);
    return {
      message: 'deleted successfully',
    };
  }
}
