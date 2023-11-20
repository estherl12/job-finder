import { Review } from "src/review/entities/review.entity";
import { ServiceBooking } from "src/service-booking/entities/service-booking.entity";
import { ServiceCategory } from "src/service-category/entities/service-category.entity";
import { ServiceGallery } from "src/service-gallery/entities/service-gallery.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

@Column({nullable:true})
averagerate:number;

@ManyToOne(()=>ServiceCategory,(servicecategory)=>servicecategory.service)
@JoinColumn({name:'servicecategory_id'})
servicecategory:ServiceCategory

@OneToMany(()=>Review,(review)=>review.service)
review:Review[]

@OneToMany(()=>ServiceBooking,(booking)=>booking.service)
booking:ServiceBooking

@OneToMany(()=>ServiceGallery,(gallery)=>gallery.service)
gallery:ServiceGallery[]
}
