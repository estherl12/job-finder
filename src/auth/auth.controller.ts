import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { loginDto } from 'src/dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { LocalAuthGuard } from 'src/@guards/local-auth-guard';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { CurrentUser } from './decorator/currentuser.decorator';

@ApiTags("Authentication for Token")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(enduser)
    private readonly userRepo: Repository<enduser>,
  ) {}

    // @UseGuards(AuthGuardJwt)
    // @ApiConsumes('multipart/form-data')
    // @UseInterceptors(NoFilesInterceptor())  //to accept multipart/form-data but not allow any files to be uploaded, use the NoFilesInterceptor. This
    // @ApiBody({ type:  loginDto})
    // @Post('login2')
    // loginAuth(@Body() @CurrentUser() user: enduser){
        
    //     console.log(user);
    //     return this.authService.tokenGenerator(user);
    // }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('application/x-www-form-urlencoded') //when we are not using any file or images we use 'application/x-www-form-urlencoded'
  @ApiBody({ type: loginDto })
      async login(@CurrentUser() user: enduser) {

        const token = await this.authService.tokenGenerator(user);
        return {
          access_token:token
        }
      }

  // @UseGuards(AuthGuardJwt)
  // @Get('profile')
  //     async profile(@CurrentUser() user: enduser) {
  //       return user;
  //     }
}
