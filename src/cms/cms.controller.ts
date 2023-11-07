import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmDto } from './dto/create-cm.dto';
import { UpdateCmDto } from './dto/update-cm.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {v4 as uuidv4} from 'uuid';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { skip } from 'node:test';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}
  SERVER_URL = 'http://localhost:3005/';

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:CreateCmDto})
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
    @Body() createCmDto: CreateCmDto,
    @UploadedFile() image:Express.Multer.File
    ) {
    createCmDto.image = `${this.SERVER_URL}${image.filename}`
    const data = await this.cmsService.create(createCmDto);
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
  async index(
    @Query('page',new DefaultValuePipe(1),ParseIntPipe) page:number = 1,
    @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit:number=10
  ){
    limit = limit>15?15:limit
    return this.cmsService.paginate({
      page,
      limit,
      // route:'http://localhost:3005/blogapi#/CMS/CmsController_findOne'
    })
  }

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:UpdateCmDto})
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
  async update(@Param('id') id: number, @Body() updateCmDto: UpdateCmDto,@UploadedFile() image:Express.Multer.File) {
    updateCmDto.image = `${this.SERVER_URL}${image.filename}`
    const data = await this.cmsService.update(+id, updateCmDto);
    return {
      message:'Updated successfully',
      data:data
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.cmsService.remove(+id);
    return {
      message:'deleted successfully'
    }
  }
}
