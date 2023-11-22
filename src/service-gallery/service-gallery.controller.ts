import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ServiceGalleryService } from './service-gallery.service';
import { CreateServiceGalleryDto } from './dto/create-service-gallery.dto';
import { UpdateServiceGalleryDto } from './dto/update-service-gallery.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {v4 as uuidv4} from 'uuid';
import { extname } from 'path';
import { multerDiskStorage, pngFileFilter } from './FileValidator/file.validator';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
const VALID_UPLOADS_MIME_TYPES = ['image/png', 'application/pdf', 'image/jpeg'];


@ApiTags('Service-gallery')
@Controller('service-gallery')

export class ServiceGalleryController {
  SERVER_URL = 'http://localhost:3005/';
  constructor(private readonly serviceGalleryService: ServiceGalleryService) {}
  
  // @ApiBody({type:CreateServiceGalleryDto})
  // @ApiConsumes('multipart/form-data')
  // @Post()
  // @UseInterceptors(FilesInterceptor('image[]', 5, {
  //   storage: diskStorage({
  //     destination: './files',
  //     filename: (req, file, callback) => {
  //       const fileExt = extname(file.originalname);
  //       const filename = uuidv4() + `${fileExt}`;
  //       callback(null, filename);
  //     }
  //   }),
    // fileFilter:pngFileFilter
  // }))
  // async create(
  //   @Body() createServiceGalleryDto: CreateServiceGalleryDto,
  //   @UploadedFiles() image:Array<Express.Multer.File>) {
  //     console.log(image);
      
  //     createServiceGalleryDto.image =image.map((item)=>`${SERVER_URL}${item.filename}`)
  //     console.log(createServiceGalleryDto.image);

  //     const data =  await this.serviceGalleryService.create(createServiceGalleryDto)
  //     return {
  //       message:"Image successfully uploaded",
  //       data:data
  //     }
  // }
  @Post()
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({type:CreateServiceGalleryDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{
    storage:multerDiskStorage
  }))
 async create( @Body() createServiceGalleryDto: CreateServiceGalleryDto,
 @UploadedFile() image:Express.Multer.File){
     createServiceGalleryDto.image = `${this.SERVER_URL}${image.path}`
    const data = await this.serviceGalleryService.create(createServiceGalleryDto);
    return {
      message:"image uploaded successfully",
      imageurl:data
    }
 }
  @Get()
  async findAll() {
    const [image,count] = await this.serviceGalleryService.findAll();
    return {
      message:"data fetched successfully",
      data:image,
      total:count
    }
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const image = await this.serviceGalleryService.findOne(+id);
    return {
      message:"data fetched successfully",
      data:image
    }
  }

  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiBody({type:CreateServiceGalleryDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{
    storage:multerDiskStorage
  }))
  async update(@Param('id',ParseIntPipe) id: number, 
  @Body() updateServiceGalleryDto: UpdateServiceGalleryDto,
  @UploadedFile() image?:Express.Multer.File) {

    updateServiceGalleryDto.image = `${this.SERVER_URL}${image.path}`
    
    return await this.serviceGalleryService.update(id, updateServiceGalleryDto);
  }

  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
     await this.serviceGalleryService.remove(+id);
     return {
      message:"Successfully Deleted"
     }
  }
}
