import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commentEntity } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { commentDto } from './dtos/comment.dto';
import { blogEntity } from 'src/users/entities/blog.entity';
import { enduser } from 'src/endusers/entities/endusers.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(commentEntity)
    private readonly commentRepo: Repository<commentEntity>,
    @InjectRepository(blogEntity)
    private readonly blogRepo: Repository<blogEntity>,
  ) {}
  async getCommentById(id: number) {
    // const blogFind = await this.blogRepo.findOne({where:{id:id}})
    // const commentFind = await this.commentRepo.find({where:{blog:blogFind}});
    const commentFind = await this.commentRepo.find({
      relations: { blog: true },
      where: { blog: { id: id } },
    });

    return commentFind;
  }

  async getComments() {
    const comments = await this.commentRepo.findAndCount();

    return comments;
  }

  async findOnebyId(id: number): Promise<commentEntity> {
    return await this.commentRepo.findOne({
      where: { id: id },
    });
  }

  async writeComment(newCmt: commentDto, user: enduser):Promise<commentEntity> {
    const newComment = new commentEntity();
    const blogFind = await this.blogRepo.findOne({
      where: { id: newCmt.blog_id },
    });
    if(!blogFind){
      throw new NotFoundException("Blog not found")
    }
    newComment.blog = blogFind;
    newComment.comment = newCmt.comment;
    newComment.users = user;

    return this.commentRepo.save(newComment);
  }

  async DeleteComment(id: number): Promise<any> {
    return await this.commentRepo.delete(id);
  }

  async Update(
    comment: commentEntity,
    newComment: commentEntity,
  ): Promise<commentEntity> {
    return await this.commentRepo.save({
      ...comment,
      ...newComment,
    });
  }
}
