import { Exclude, Expose } from "@nestjs/class-transformer";
import { enduser } from "src/endusers/entities/endusers.entity";
import { blogEntity } from "src/users/entities/blog.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Exclude()
@Entity()
export class commentEntity{
    @PrimaryGeneratedColumn()
    @Expose()
    id:number;
    
    @Column()
    @Expose()
    comment:string;

    @ManyToOne(()=>enduser,(users)=>users.comments,{
        eager:true
    })
    @JoinColumn({name:"user_id"})
    users:enduser

    @ManyToOne(()=>blogEntity,(blog)=>blog.comments,{
        onDelete:"CASCADE" //on deltetion of blog it is also deleted
    })
    @JoinColumn({name:"blog_id"})
    blog:blogEntity


}