import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { CareervacancyService } from './careervacancy.service';
import { CreateCareervacancyDto } from './dto/create-careervacancy.dto';
import { UpdateCareervacancyDto } from './dto/update-careervacancy.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Role_Key, Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { EndusersService } from 'src/endusers/endusers.service';

@ApiTags('Career-Vacancy')
@Controller('vacancy')
export class CareervacancyController {
  constructor(private readonly careervacancyService: CareervacancyService,
    private readonly userService:EndusersService) {}

  @Post()
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Employer)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({type:CreateCareervacancyDto})
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createCareervacancyDto: CreateCareervacancyDto,
    @CurrentUser() Currentuser) {
     
     const user = await this.userService.findUser(Currentuser.userId);
    const data = await this.careervacancyService.create(createCareervacancyDto,user);
    delete data.user.password
    delete data.user.accesstoken
    return {
      status:200,
      message:'Job posted successfully',
      job:data
    }
  }

  @Get()
  async findAll() {
    const [vacancy,count]=await this.careervacancyService.findAll();
    return {
      vacancies:vacancy,
      total:count
    }
  }

  @Get('/admin/:id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Employer)
  async findOne(@Param('id') id: string) {
    const data=await this.careervacancyService.findOneWithRelations(+id);
    return {
      status:200,
      job:data
    }
  }

  @Get('/user/:id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Applicant)
  async findOneById(@Param('id') id: string) {
    const data=await this.careervacancyService.findOne(+id);
    return {
      status:200,
      job:data
    }
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.Employer)
  @UseGuards(AuthGuardJwt,RolesGuard)
  @ApiBody({type:UpdateCareervacancyDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  async update(
      @Param('id') id: string, 
      @Body() updateCareervacancyDto: UpdateCareervacancyDto,
      @CurrentUser() currentuser
  ) {
      const user = await this.userService.findUser(currentuser.userId);
      const data = await this.careervacancyService.update(+id, updateCareervacancyDto,user);
      console.log(data);
      
      return {
        status:200,
        message:'Updated Successfully',
        job:data
      }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Employer)
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentuser
    ) {
    const user = await this.userService.findUser(currentuser.userId);
    const data = await this.careervacancyService.remove(+id,user);
    return {
      status:200,
      message:'Job Post deletion successful'
    }
  }
}
