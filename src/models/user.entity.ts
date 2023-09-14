import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { categoryentity } from "./category.entity";

@Entity()
export class blogEntity{
@PrimaryGeneratedColumn()
id?:number;

@Column()
title:string

@Column()
desc:string

@Column()
image:string;

@Column()
metadata:string

@OneToOne(()=>categoryentity,category=>category.blogEntity)
@JoinColumn()
category:categoryentity;


}