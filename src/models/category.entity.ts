import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { blogEntity } from "./user.entity";

@Entity()
export class categoryentity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;


   @OneToOne(()=>blogEntity,)
   blogEntity:blogEntity;
}