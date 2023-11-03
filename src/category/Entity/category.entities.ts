import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Exclude, Expose } from '@nestjs/class-transformer';
import { blogEntity } from 'src/users/entities/blog.entity';
  
  @Exclude()
  @Entity()
  export class categoryentity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;
  
    @Column({nullable:false})
    @Expose()
    name: string;
  
    @OneToMany(() => blogEntity, (blogentity) => blogentity.category)
    blogentity: blogEntity;
  }
  