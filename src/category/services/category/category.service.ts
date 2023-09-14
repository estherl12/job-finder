import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryParams } from 'src/category/utils/types';
import { createCateDto } from 'src/dtos/category.dto';
import { categoryentity } from 'src/models/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(categoryentity) private categoryRepo:Repository<categoryentity>){}

    createCategory(categoryDetails:CategoryParams){
        const newCategory = this.categoryRepo.create(categoryDetails)
        return this.categoryRepo.save(newCategory);
    }
    findCategory(){
        return this.categoryRepo.find();
    }
    updateCategory(id:number , updateCate:CategoryParams){
        return this.categoryRepo.update(id,{...updateCate}) //Spread Operator
    }
    deleteCategory(id:number){
       return this.categoryRepo.delete(id); 
    }
}
