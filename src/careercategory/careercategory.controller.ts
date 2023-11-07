import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { CareercategoryService } from './careercategory.service';
import { CreateCareercategoryDto } from './dto/create-careercategory.dto';
import { UpdateCareercategoryDto } from './dto/update-careercategory.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { EndusersService } from 'src/endusers/endusers.service';

@ApiTags('Career-Category')
@Controller('CareerCategory')
export class CareercategoryController {
  constructor(
    private readonly careercategoryService: CareercategoryService,
    private readonly userService:EndusersService) {}

    @Get()
    async findAll() {
      const [category,count]= await  this.careercategoryService.findAll();
  
      return {
        status:200,
        category:category,
        total:count
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.careercategoryService.findOneWithVacancy(+id);
    }


  @Post()
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({type:CreateCareercategoryDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() createCareercategoryDto: CreateCareercategoryDto,@CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId)
    const data = await this.careercategoryService.create(createCareercategoryDto,user);
    return {
      status:200,
      message:"Job category created successfully",
      category:data
    }
  }

  

  @Patch(':id')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({type:UpdateCareercategoryDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  async update(@Param('id') id: string, 
  @Body() updateCareercategoryDto: UpdateCareercategoryDto,
  @CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId)
    
    const update = await this.careercategoryService.update(+id, updateCareercategoryDto,user);
    return {
      status:200,
      message:'updated successfully'
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('JWT-auth')
  async remove(
  @Param('id') id: string,
  @CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId)
    const deleted = await this.careercategoryService.remove(+id,user);
    return {
      status:200,
      message:'deleted successfully',
    }
  }
}
