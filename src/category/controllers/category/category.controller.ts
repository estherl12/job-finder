import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { categoryentity } from 'src/category/Entity/category.entities';
import { createCateDto } from 'src/category/dtos/category.dto';
import { CategoryService } from 'src/category/services/category/category.service';
import { enduser } from 'src/endusers/entities/endusers.entity';

@ApiTags("Category")
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @Get()
    async findAllCategory(){
        return await this.categoryService.findCategory();
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuardJwt)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(NoFilesInterceptor())  //to accept multipart/form-data but not allow any files to be uploaded, use the NoFilesInterceptor. This
    @ApiBody({ type:  createCateDto})
    @Post()
    createCategory(@Body() createDto:createCateDto):Promise<categoryentity>{
        console.log(createDto);
        console.log("hi");
        
        return this.categoryService.createCategory(createDto);
    }

    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuardJwt)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(NoFilesInterceptor())  //to accept multipart/form-data but not allow any files to be uploaded, use the NoFilesInterceptor. This
    @ApiBody({ type:  createCateDto})
    @Patch(':id')
    update(@Param('id') id:number ,
     @Body() categoryDto:createCateDto,
     @CurrentUser() user:enduser){
        const updateCategory =  this.categoryService.updateCategory(id,{...categoryDto})
        
        return {
            "status":"200",
            "message":"Category Updated Successfully"
        }
    }
    
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuardJwt)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(NoFilesInterceptor())  //to accept multipart/form-data but not allow any files to be uploaded, use the NoFilesInterceptor. This
    @Delete(':id')
    async remove(@Param('id') id:number){
        const categoryFind = await this.categoryService.findOneCategory(id);
        if(!categoryFind){
            throw new NotFoundException("Not found with this")
        }
        const categoryDeleted =  this.categoryService.deleteCategory(+id);
        return {
            "status":"200",
            "message":"Deletion Successful"
        }
    }
}
