import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, ParseIntPipe, DefaultValuePipe, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmDto } from './dto/create-cm.dto';
import { UpdateCmDto } from './dto/update-cm.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import {v4 as uuidv4} from 'uuid';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { skip } from 'node:test';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}
  SERVER_URL = 'http://localhost:3005/';

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiExtraModels(CreateCmDto)
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({type:CreateCmDto})
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
      destination:'./files',
      filename:(req,file,callback)=>{
        const fileExt = extname(file.originalname)
        const filename = uuidv4()+`${fileExt}`
        callback(null,filename)
      }
    })
  }
  ))
  async create(
    @Body(ValidationPipe) createCmDto: CreateCmDto,
    @UploadedFile() image:Express.Multer.File
    ) {

      // if(image){
      //   createCmDto.image = `${this.SERVER_URL}${image.filename}`;
      // }else{
  
      //   createCmDto.image = `${this.SERVER_URL}${createCmDto.image}`;
      // }
    
    const data = await this.cmsService.create(createCmDto);
    // data.children.map((item)=>this.cmsService.create(item));
    return {
      message:'cms page created successfully',
      cmsDetail:data
    }
  }

  // @Get()
  // async findAll() {
  //   const data = await this.cmsService.findAll();
  //   return {
  //     message:'cms page fetched successfully',
  //     cmsDetails:data
  //   }
  // }



  @Get('')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async index(
    @Query('page',new DefaultValuePipe(1),ParseIntPipe) page:number = 1,
    @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit:number=10
  ){
    limit = limit>15?15:limit
    return{
      cmsDetails:await  this.cmsService.paginate({
      page,
      limit,
      // route:'http://localhost:3005/blogapi#/CMS/CmsController_findOne'
    })
  }}

  @Get(':id')
  async findOne(@Param('id') id:number) {
    const data = await this.cmsService.findOne(+id);
    return {
      message:'data fetched successfully',
      cmsDetails:data
    }
  }

  // @Get()
  // async findWithPagination(
  //   @Query('take') take:number = 1,
  //   @Query('skip')  skip:number = 1
  // ){
  //   take = take>20?20:take ;
  //   return this.cmsService.findWithPagination(take,skip)
  // }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({type:UpdateCmDto})
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
      destination:'./files',
      filename:(req,file,callback)=>{
        const fileExt = extname(file.originalname)
        const filename = uuidv4()+`${fileExt}`
        callback(null,filename)
      }
    })
  }
  ))
  async update(@Param('id') id: number, @Body(ValidationPipe) updateCmDto: UpdateCmDto,@UploadedFile() image:Express.Multer.File) {
    // updateCmDto.image = `${this.SERVER_URL}${image.filename}`
    if(image){
      updateCmDto.image = `${this.SERVER_URL}${image.filename}`;
    }else{
      updateCmDto.image = `${this.SERVER_URL}${updateCmDto.image}`;
    }
  
    const data = await this.cmsService.update(+id, updateCmDto);
    return {
      message:'Updated successfully',
      data:data
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const data = await this.cmsService.remove(+id);
    return {
      message:'deleted successfully'
    }
  }
}
