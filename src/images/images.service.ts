import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private Images:Repository<Image>){}
  async create(createImageDto: CreateImageDto) {
    const Newimage = new Image();
    Newimage.image = createImageDto.image
    // Newimage.category = createImageDto.category

    return await this.Images.save(Newimage)
  }

  async findAll() {
    return await this.Images.find();
  }

  async findOne(id: number) {
    return await this.Images.findOne({where:{id:id}})
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
