import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import { imageUploadFilter, multerDiskStorage } from './fileValidator';
import { CreateUploadDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageUploadFilter,
      storage: multerDiskStorage,
    }),
  )
  @Post('image')
  create(
    @Body() body: CreateUploadDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    if (!image) throw new BadRequestException("File wasn't uploaded");

    console.log(image);

    return {
      message: 'File was uploaded successfully',
      data: {
        image: `/${image.path}`,
      },
    };
  }
}
