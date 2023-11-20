import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, ValidationPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags("Services-Category")
@Controller('service-category')
export class ServiceCategoryController {
  constructor(private readonly serviceCategoryService: ServiceCategoryService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiExtraModels(CreateServiceCategoryDto) // for CatDto to be found by getSchemaPath()
//  @ApiResponse({
//   schema: {
  
//   }
// })
  @ApiBody({type:CreateServiceCategoryDto})
  async create(@Body(ValidationPipe) createServiceCategoryDto: CreateServiceCategoryDto) {
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

  @Get('Services/:id')
  async findOne(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id: string) {
    const data = await this.serviceCategoryService.findWithServices(+id);
    if(!data){
      throw new NotFoundException("Category not found")
    }
    return {
      message:"Data fetched successfully",
      data:data
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateServiceCategoryDto: UpdateServiceCategoryDto) {
    const category =   await this.serviceCategoryService.update(id, updateServiceCategoryDto);
    return {
      message:"Updated successfully",
      data:category
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    const deleted = await this.serviceCategoryService.remove(id);
    return {
      message:"deleted successfully"
    }
  }
}
