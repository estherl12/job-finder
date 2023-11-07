import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCmDto } from './dto/create-cm.dto';
import { UpdateCmDto } from './dto/update-cm.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cms } from './entities/cm.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(Cms) private readonly cmsRepository:Repository<Cms>,
    @InjectDataSource() private dataSource:DataSource
  ){}
  
  async create(createCmDto: CreateCmDto) {
  const parent = await this.cmsRepository.findOne({where:{id:createCmDto.parent_id}})
   const cms = new Cms();
   cms.title = createCmDto.title;
   cms.description = createCmDto.description
   cms.metadescription = createCmDto.metadescription
   cms.image = createCmDto.image
   cms.parent = parent
  
   return await this.cmsRepository.save(cms)
  }

  async findAll() {
    const cms = await this.cmsRepository
      .createQueryBuilder('cms')
      .where('cms.parent_id is null')
      .getMany();
    // const cms =  await this.cmsRepository.find({relations:{parent:true},where:{parent:null}})
    // const cms= this.dataSource.createQueryBuilder()
    //             .select('cms')
    //             .from(Cms,'cms')
    //             .where('cms.parent_id =:parent_id',{parent_id:null})
    //             .getMany()

      return cms;
  }

  async findOne(id: number) {
    const cms =  await this.cmsRepository.findOne({where:{id:id},relations:{parent:true,children:true}})
    if(!cms){
      throw new NotFoundException("Cms not found")
    }
    return cms;
  }

  async update(id: number, updateCmDto: UpdateCmDto) {
    const parent = await this.cmsRepository.findOne({where:{id:updateCmDto.parent_id}})
    // if(!parent){
    //   throw new NotFoundException('Parent Cms not found')
    // }
    const cms = await this.cmsRepository.findOne({where:{id:id}})
    if(!cms){
      throw new NotFoundException('Cms not found')
    }
    cms.title = updateCmDto.title
    cms.description = updateCmDto.description
    cms.image = updateCmDto.image
    cms.metadescription = cms.metadescription
    cms.parent = parent

    const data = await this.cmsRepository.save(cms);
    return data;
  }

  async remove(id: number) {
    const data =  await this.cmsRepository.delete(id);
   return data
  }
}
