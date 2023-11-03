import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { categoryentity } from 'src/category/Entity/category.entities';
import { CategoryParams } from 'src/category/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(categoryentity)
    private categoryRepo: Repository<categoryentity>,
  ) {}

  createCategory(categoryDetails:CategoryParams) {
      const newCategory = new categoryentity();
      newCategory.name = categoryDetails.name;
      // const newCategory = this.categoryRepo.create(categoryDetails);
      return this.categoryRepo.save(newCategory);
  }

  async findCategory() {
     return await this.categoryRepo.find();
  }

  async findOneCategory(id: number) {
      return await this.categoryRepo.findOne({ where: { id: id } });
  }
  async updateCategory(id: number, updateCate: CategoryParams){

      return await this.categoryRepo.update(id, { ...updateCate }); //Spread Operator
  }
  
  async deleteCategory(id: number) {
    return await this.categoryRepo.delete(id);
    // return response.status(200).send({message:"deleted successfully"})
  }
}
