import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmDto } from './dto/create-cm.dto';
import { UpdateCmDto } from './dto/update-cm.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {v4 as uuidv4} from 'uuid';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  create(
    @Body() createCmDto: CreateCmDto,
    @UploadedFile() image:Express.Multer.File
    ) {
    createCmDto.image = `${this.SERVER_URL}${image.filename}`
    return this.cmsService.create(createCmDto);
  }

  @Get()
  async findAll() {
    return await this.cmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.cmsService.findOne(+id);
  }

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
