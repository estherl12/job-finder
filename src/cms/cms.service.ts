import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCmDto } from './dto/create-cm.dto';
import { UpdateCmDto } from './dto/update-cm.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cms } from './entities/cm.entity';
import { DataSource, Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(Cms) private readonly cmsRepository:Repository<Cms>,
    @InjectDataSource() private dataSource:DataSource
  ){}
  
  async create(createCmDto: CreateCmDto) {

   const cms = new Cms();
   cms.title = createCmDto.title;
   cms.description = createCmDto.description
   cms.metadescription = createCmDto.metadescription
   cms.image = createCmDto.image
  //  cms.children = createCmDto.children
  const data = await this.cmsRepository.save(cms);
  if(createCmDto.children){ 
      const child = createCmDto.children.map((child)=>child.parent = data)
      const childs= createCmDto.children.map((item)=>this.cmsRepository.save(item));
    }
      
 return data;
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
    const cms =  await this.cmsRepository
    // .findOne({where:{id:id,parent:null},relations:{children:true}})
                  .createQueryBuilder('cms')
                  .leftJoinAndSelect("cms.children","children")
                  .where('cms.id =:id and cms.parent_id is null',{id:id})
                  // .andWhere('cms.parent = :parent',{parent:null})
                  .getOne()

    if(!cms){
      throw new NotFoundException("Cms not found")
    }
    return cms;
  }

  async update(id: number, updateCmDto: UpdateCmDto) {
    
    const cms = await this.cmsRepository.findOne({where:{id:id}})
    if(!cms){
      throw new NotFoundException('Cms not found')
    }
    cms.title = updateCmDto.title
    cms.description = updateCmDto.description
    cms.image = updateCmDto.image
    cms.metadescription = updateCmDto.metadescription
    // if(cms.children){
      //   await this.cmsRepository.save(cms.children);
      // }
      const data = await this.cmsRepository.save(cms);

      if(updateCmDto.children){ 
        const child = updateCmDto.children.map((child)=>child.parent = data)
        const childs= updateCmDto.children.map((item)=>this.cmsRepository.save(item));
      }
    return data;
  }
  // findWithPagination(take:number = 10,skip:number = 0):Observable<Cms[]>{
  //  return from( this.cmsRepository.findAndCount({take,skip}).then(([cmsDetails])=>{
  //     return <Cms[]>cmsDetails ;
  //   })
  //   );
  // }

  async paginate(options:IPaginationOptions):Promise<Pagination<Cms>>{
    const querybuilder = await this.cmsRepository
      .createQueryBuilder('cms')
      .where('cms.parent_id is null')

    return paginate<Cms>(querybuilder,options)  //method from package which takes select querybuilder and options
  }

  async remove(id: number) {
    const data =  await this.cmsRepository.delete(id);
   return data;
  }
}
