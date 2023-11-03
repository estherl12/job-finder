import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { commentEntity } from 'src/comment/entity/comment.entity';
  
  import { Exclude, Expose } from 'class-transformer';
import { categoryentity } from 'src/category/Entity/category.entities';
import { enduser } from 'src/endusers/entities/endusers.entity';
  
  @Entity()
  export class blogEntity {
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column()
    title: string;
  
    @Column()
    desc: string;
  
    @Column()
    image: string;
  
    @Column()
    metadata: string;
  
    @ManyToOne(() => categoryentity, (category) => category.blogentity,{
      cascade: ["insert", "update","remove"]
    })
    @JoinColumn({ name: 'category_id' })
    category: categoryentity;
  
    @ManyToOne(() => enduser, (users) => users.blog,{
      cascade: ["insert", "update"]
    })
    @JoinColumn({ name: 'enduserId' })
    users: enduser;
  
    @Column({ nullable: true })
    enduserId: number;
  
    @OneToMany(() => commentEntity, (comments) => comments.blog)
    comments: commentEntity;
  }
  