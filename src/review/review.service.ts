import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ServiceService } from 'src/service/service.service';
import { EndusersService } from 'src/endusers/endusers.service';
import { enduser } from 'src/endusers/entities/endusers.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository:Repository<Review>,
    private readonly serviceServices:ServiceService,
    private readonly userService:EndusersService){}

  
  async create(createReviewDto: CreateReviewDto,user:enduser) {
    
    const service = await this.serviceServices.findOne(createReviewDto.service_id);
    if(!service){
      throw new NotFoundException("couldnot find the service")
    }
    
    const Newreview = new Review()

    Newreview.rate = createReviewDto.rate ;
    Newreview.remark = createReviewDto.remark;
    Newreview.service = service;
    Newreview.user = user;
    const newReview = await this.reviewRepository.save(Newreview);

    const ratesLength = service.review.length;
    let rate = 0;
  
  service.review.forEach((item)=>{rate+=item.rate})
    const averageRate = rate/ratesLength
    service.averagerate = parseFloat(`${averageRate}`)
    
    const updated = await this.serviceServices.updateForRate(createReviewDto.service_id,service.averagerate);
    return newReview;
  }

  async findAll() {

   return await this.reviewRepository.find();
  }

 async findOne(id: number) {
    return await this.reviewRepository.findOne({where:{id:id},relations:{service:true,user:true}})
  }

  async update(id: number, updateReviewDto: UpdateReviewDto,user:enduser) {
    const review = await this.reviewRepository.findOne({where:{id:id}});

    // console.log(user.email);
    // console.log(review.user);
    
    // if(review.user!=user){
    //   throw new ForbiddenException("You are forbidden for this action")
    // }

    const service = await this.serviceServices.findById(updateReviewDto.service_id);
    if(!service){
      throw new NotFoundException("couldnot find the service")
    }
     
    if(updateReviewDto.rate){
      review.rate = updateReviewDto.rate
    }
    if(updateReviewDto.remark){
      review.remark = updateReviewDto.remark
    }
    if(updateReviewDto.service_id){
      review.service = service
    }
   return await this.reviewRepository.save(review);
  }

  async remove(id: number,user:enduser) {
    const review = await this.reviewRepository.findOne({where:{id:id}})
    if(review.user.email!=user.email){
      throw new ForbiddenException("You are forbidden for this action")
    }
    return await this.reviewRepository.delete(id);
  }
}
