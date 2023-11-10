import { ServiceCategory } from "src/service-category/entities/service-category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
@PrimaryGeneratedColumn()
id:number;

@Column()
title:string;

@Column()
shortDescription:string;

@Column()
description:string

@Column()
image:string;

@ManyToOne(()=>ServiceCategory,(servicecategory)=>servicecategory.service)
@JoinColumn({name:'servicecategory_id'})
servicecategory:ServiceCategory

}
