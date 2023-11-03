import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createEndUserDto } from './dtos/enduser.dto';
// import { EndusersService } from './endusers.service';
import { AuthService } from 'src/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { enduserSerializer } from 'src/endusers/serializer/enduser.serializer';
import { Response } from 'express';
import { EndusersService } from './endusers.service';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { enduser } from './entities/endusers.entity';
import { EnduserupdateDto } from './dtos/enduserupdate.dto';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { EmployerDto } from './dtos/employer.dto';

@ApiTags('User Registration')
@Controller('endusers')
@SerializeOptions({ strategy: 'excludeAll' })
export class EndusersController {
  constructor(private endUserService: EndusersService) {}

  @Get()
  async getUsers(){
    const [endUsers , count] = await this.endUserService.getusers();
    return plainToClass(
      enduserSerializer,
      {
        data:endUsers,
        total:count
      },
      {
        strategy:"excludeAll"
      }
    )
  }

  @Post()
  @ApiBody({ type: createEndUserDto })
  @ApiConsumes('multipart/form-data')
  // @UseInterceptors(ClassSerializerInterceptor) //for not exposing all the fields
  @UseInterceptors(NoFilesInterceptor())
  async registerUser(@Body(new ValidationPipe()) FormData: createEndUserDto) {
    
    const user = await this.endUserService.createUsers(FormData);
    delete user.password;
    delete user.accesstoken;
    return {
      message:"User created successfully. Plz login to get token",
     data:user
    }
  }
  @Post('employer')
  @ApiBody({ type: EmployerDto })
  @ApiConsumes('multipart/form-data')
  // @UseInterceptors(ClassSerializerInterceptor) //for not exposing all the fields
  @UseInterceptors(NoFilesInterceptor())
  async registerEmployer(@Body(new ValidationPipe()) FormData: EmployerDto) {
    
    const user = await this.endUserService.createEmployer(FormData);
    delete user.password;
    delete user.accesstoken;
    return {
      message:"User created successfully. Plz login to get token",
     data:user
    }
  }
  
  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  @ApiBody({type:EnduserupdateDto})
  async updateUser(
    @Param('id') id:number,
    @CurrentUser() currentuser:enduser,
    @Body() userdetails,
  ){
    const olduser = await this.endUserService.findUser(id)
    console.log("🚀 ~ file: endusers.controller.ts:103 ~ EndusersController ~ userdetails:", userdetails)
    
    if(olduser.id!=currentuser.id){
      throw new ForbiddenException("You are forbidden to update");
    }
    const user = await this.endUserService.updateUser(id,userdetails);
    delete user.password,
    delete user.accesstoken
    
    return {
      message:"Updated successfully",
      data:user
    }
  }

  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async deleteUser(
    @Param('id' ) id:number , 
    @CurrentUser() currentuser : enduser,
  ){
    const userFind = await this.endUserService.findUser(id);
    
    if(currentuser.email!=userFind.email){
      throw new ForbiddenException("You are forbidden for this action.")
    }
    const deleted = await this.endUserService.deleteUser(id);
    return {
      message:"user successfully deleted"
    }
  }
  
    

}
