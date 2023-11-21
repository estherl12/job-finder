import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ServiceBookingService } from './service-booking.service';
import { CreateServiceBookingDto } from './dto/create-service-booking.dto';
import { UpdateServiceBookingDto } from './dto/update-service-booking.dto';
import { ApiBearerAuth, ApiExtraModels, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { EndusersService } from 'src/endusers/endusers.service';

@ApiTags('Service-Booking')
@Controller('service-booking')
export class ServiceBookingController {
  constructor(private readonly serviceBookingService: ServiceBookingService,
    private readonly userService:EndusersService) {}

  @ApiProperty({type:CreateServiceBookingDto})
  @ApiExtraModels(CreateServiceBookingDto)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  @Post()
  async create(@Body() createServiceBookingDto: CreateServiceBookingDto,
  @CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId)
    const booking =  await this.serviceBookingService.create(createServiceBookingDto,user);
    delete booking.user.password
    delete booking.user.accesstoken
    delete booking.user.role
    delete booking.service
    return {
      message:"Service Booked Successfully.",
      data:booking
    }
  }

  @Get()
  findAll() {
    return this.serviceBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceBookingService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  async update(@Param('id',ParseIntPipe) id: number,
   @Body() updateServiceBookingDto: UpdateServiceBookingDto,
   @CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId);
    const booking =  await this.serviceBookingService.update(id, updateServiceBookingDto,user);
    delete booking.user.password
    delete booking.user.accesstoken
    delete booking.user.role
  return {
    message:"Updated successfully",
    data:booking
  }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  async remove(@Param('id',ParseIntPipe) id: number,
  @CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId);
    const booking =await this.serviceBookingService.remove(id,user);
    return {
      message:"Deleted successfully",
    }
  }
}
