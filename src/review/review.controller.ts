import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { AuthGuard } from '@nestjs/passport';
import { EndusersService } from 'src/endusers/endusers.service';
import { plainToClass } from 'class-transformer';
import { GetReviewSerializer } from './serializer/getreview.serializer';

@ApiTags('Review-Service')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly userService:EndusersService) {}

  @Post('create')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() currentuser) {
      
    const user = await this.userService.findUser(currentuser.userId) ;     
    const review = await this.reviewService.create(createReviewDto,user);
    delete review.user.password
    delete review.user.email
    delete review.user.mobile
    delete review.user.accesstoken
    delete review.user.role
    delete review.service.description
    delete review.service.shortDescription
    delete review.service.review
    delete review.service.averagerate
    delete review.service.servicecategory
    delete review.service.booking
    delete review.service.gallery

    return {
      message:"Review Added successfully",
      data:review
    }
  }

  @Get()
  async findAll() {
    const reviews = await this.reviewService.findAll();
    
    return plainToClass(GetReviewSerializer,{
        data:reviews
      },
      {strategy:'excludeAll'})
    // return {
    //   message:"data fetched successfully",
    //   data:reviews
    // };
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const data  = await this.reviewService.findOne(id);
    delete data.user.password;
    delete data.user.accesstoken
    delete data.user.mobile;
    return {
      message:"Data fetched successfully",
      data:data
    }
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto,
  @CurrentUser() currentuser) {
    const user = await this.userService.findUser(currentuser.userId)      
    const updated =  await this.reviewService.update(+id, updateReviewDto,user);
    delete updated.user.password
    delete updated.user.email
    delete updated.user.mobile
    delete updated.user.accesstoken
    delete updated.user.role
    delete updated.service.description
    delete updated.service.shortDescription
    return {
      message:"Updated Successfully",
      data:updated
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  async remove(
    @Param('id') id: number,
    @CurrentUser() currentuser) {
      const user = await this.userService.findUser(currentuser.userId)
      const deletedReview = await this.reviewService.remove(id,user);
      return {
        message:"deleted successfully"
      }
  }
}
