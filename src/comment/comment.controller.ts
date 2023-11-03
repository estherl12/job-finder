import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { commentDto } from './dtos/comment.dto';
import { AuthGuardJwt } from 'src/@guards/jwt-auth-guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { count, log } from 'console';
import { commentEntity } from './entity/comment.entity';
import { updateCommentDto } from './dtos/comment.updateDto';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { plainToClass } from 'class-transformer';
import { GetBlogSerializer } from './serializer/getcomment.serializer';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments() {
    const [comments, count] = await this.commentService.getComments();

    return plainToClass(
      GetBlogSerializer,
      {
        data: comments,
      total:count
      },
      {
        strategy: 'excludeAll',
      },
    );
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: commentDto })
  @UseInterceptors(NoFilesInterceptor())
  async createComment(@Body() cmt: commentDto, @CurrentUser() user: enduser) {

    const comment = await this.commentService.writeComment(cmt, user);
    delete user.password;
    delete user.mobile;
    delete user.email;
    delete user.accesstoken;
    delete comment.blog;

    return { 
      // message:`comment successful on blog with id ${comment.blog.id}`,
      data: comment };
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: updateCommentDto })
  @UseInterceptors(NoFilesInterceptor())
  async updateComment(
    @Param('id') id: number,
    @Body() editComment: commentEntity,
    @CurrentUser() user: enduser,
  ) {
    const oldComment = await this.commentService.findOnebyId(id);
    if (!oldComment) {
      throw new NotFoundException('Comment not found');
    }

    if (oldComment.users.id != user.id) {
      throw new ForbiddenException('You are forbidden');
    }
    oldComment.comment = editComment.comment;
    const newComment = await this.commentService.Update(
      oldComment,
      editComment,
    );
    delete newComment.users.password;
    delete newComment.users.accesstoken;
    delete newComment.users.email;
    delete newComment.users.mobile;

    return {
        message:"Updated Successfully"
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuardJwt)
  @ApiConsumes('multipart/form-data')
  async DeleteById(
    @Param('id') id: string,
    @CurrentUser() Currentuser: enduser,
  ): Promise<any> {
    const commentFind = await this.commentService.findOnebyId(Number(id));
    if (!commentFind) {
      throw new NotFoundException('no such comment');
    }

    if (Currentuser.id != commentFind.users.id) {
      throw new ForbiddenException('Forbidden to delete');
    } else {
      const deletedCmt = await this.commentService.DeleteComment(Number(id));
      
      return {
        message: 'comment deleted successfully',
      };
    }
  }

  
}
