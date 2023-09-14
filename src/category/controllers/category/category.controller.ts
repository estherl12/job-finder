import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CategoryService } from 'src/category/services/category/category.service';
import { createCateDto } from 'src/dtos/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}
    @Get()
    findAllCategory(){
        return this.categoryService.findCategory();
    }

    @Post('add')
    createCategory(@Body() createDto:createCateDto){
        return this.categoryService.createCategory(createDto);
    }
    @Patch(':id')
    update(@Param('id')id:string , @Body() categoryDto:createCateDto){
        return this.categoryService.updateCategory(Number(id),{...categoryDto})
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.categoryService.deleteCategory(+id);
    }
}
