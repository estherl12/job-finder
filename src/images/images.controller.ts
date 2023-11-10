import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {v4 as uuidv4} from 'uuid'

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  SERVER_URL = 'http://localhost:3005/';
  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:CreateImageDto})
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
    @Body() uploadDto: CreateImageDto,
    @UploadedFile() image:Express.Multer.File
    ) {

      if(image){
        uploadDto.image = `${this.SERVER_URL}${image.filename}`;
      }else{
  
        uploadDto.image = `${uploadDto.image}`;
      }
    
    const data = await this.imagesService.create(uploadDto);
    // data.children.map((item)=>this.cmsService.create(item));
    return {
      message:'image uploaded successfully',
      cmsDetail:data
    }
  }


  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imagesService.update(+id, updateImageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imagesService.remove(+id);
  // }
}
