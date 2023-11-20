import { enduser } from "src/endusers/entities/endusers.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    rate:number

    @Column()
    remark:string;

    @ManyToOne(()=>Service,(service)=>service.review,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    @JoinColumn({name:'service_id'})
    service:Service

    @ManyToOne(()=>enduser,(user)=>user.review,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user:enduser
}
