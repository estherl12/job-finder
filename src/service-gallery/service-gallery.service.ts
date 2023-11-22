import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceGalleryDto } from './dto/create-service-gallery.dto';
import { UpdateServiceGalleryDto } from './dto/update-service-gallery.dto';
import { ServiceGallery } from './entities/service-gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class ServiceGalleryService {
  constructor(
    @InjectRepository(ServiceGallery)
    private galleryRepo: Repository<ServiceGallery>,
    private readonly Services:ServiceService
  ) {}
  // async create(createServiceGalleryDto: CreateServiceGalleryDto) {
  //   const imageArr = new ServiceGallery();

  //  imageArr.image = [...createServiceGalleryDto.image];

  //   return await this.galleryRepo.save(imageArr);
  // }
async create(createServiceGalleryDto: CreateServiceGalleryDto){
  const service = await this.Services.findById(createServiceGalleryDto.service_id);
  const gallery = new ServiceGallery()
  gallery.image= createServiceGalleryDto.image
  gallery.service = service;
  return await this.galleryRepo.save(gallery);
}
  async findAll() {
    return await this.galleryRepo.findAndCount();
  }

  async findOne(id: number) {
    const image = await this.galleryRepo.findOne({where:{id:id},})
    if(!image){
      throw new NotFoundException("Image not found or empty ")
    }
    return image;
  }

  async update(id: number, updateServiceGalleryDto: UpdateServiceGalleryDto) {
    const Oldimage = await this.galleryRepo.findOne({where:{id:id}})
    if(!Oldimage){
      throw new NotFoundException("Image not found or empty ")
    }
    Oldimage.image = updateServiceGalleryDto.image
    return await this.galleryRepo.save(Oldimage);
  }

  async remove(id: number) {
    const Oldimage = await this.galleryRepo.findOne({where:{id:id}})
    if(!Oldimage){
      throw new NotFoundException("Image not found or empty ")
    }
    return await this.galleryRepo.delete(id)
  }
}
