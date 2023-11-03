import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CareerapplicationsService } from './careerapplications.service';
import { CreateCareerapplicationDto } from './dto/create-careerapplication.dto';
import { UpdateCareerapplicationDto } from './dto/update-careerapplication.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { imageUploadFilter, multerDiskStorage } from 'src/utils/fileValidator';
import { CustomFileTypeValidator } from './validation/careerapplication.validation';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { EndusersService } from 'src/endusers/endusers.service';
const MAX_CV_SIZE_IN_BYTES = 2 * 1024 * 1024;
const VALID_UPLOADS_MIME_TYPES = ['image/png', 'pdf', 'image/jpeg'];

@ApiTags('Carreer-Applications')
@Controller('applications')
export class CareerapplicationsController {
  SERVER_URL = 'http://localhost:3005/';

  constructor(
    private readonly applicationService: CareerapplicationsService,
    private readonly userService:EndusersService
  ) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Applicant)
  @ApiBody({ type: CreateCareerapplicationDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          const filename = uuidv4() + `${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() createCareerapplicationDto: CreateCareerapplicationDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        // .addFileTypeValidator({
        //   fileType: 'jpeg',
        // })
        .addMaxSizeValidator({ maxSize: MAX_CV_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    createCareerapplicationDto.file = `${this.SERVER_URL}${file.filename}`;
    const data = await this.applicationService.create(createCareerapplicationDto);
    return {
      status:200,
      message:'Your CV submitted successfully for this job.',
      applicant:data
    }
  }


  @Get()
  async findAll() {
    const [applicant,count] = await this.applicationService.findAll();
    return {
      applicants:applicant,
      total:count
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const applicant = await this.applicationService.findOne(+id);
    return {
      status:200,
      applicant : applicant
    }
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Applicant)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          const filename = uuidv4() + `${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiBody({type:UpdateCareerapplicationDto})
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateCareerapplicationDto: UpdateCareerapplicationDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_CV_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @CurrentUser() currentuser,
  ) {
    const user = await this.userService.findUser(currentuser.userId)
    updateCareerapplicationDto.file = `${this.SERVER_URL}${file.filename}`
    const data= await this.applicationService.update(+id,  updateCareerapplicationDto,user  );
    return {
      status:200,
      message:'applicant detail updated successfully',
      applicant:data
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Roles(Role.Applicant)
  async remove(@Param('id') id: string,@CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId)
    const data = await this.applicationService.remove(+id,user);
    return {
      status:200,
      message:'applicant deleted successfully',
    }
  }
}
