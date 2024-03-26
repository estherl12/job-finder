import { Service } from "src/service/entities/service.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceCategory {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string
    
    @Column()
    image:string;

    @Column()
    description:string

    @Column()
    order:number;

    @OneToMany(()=>Service,(service)=>service.servicecategory,{
        onDelete:'SET NULL',onUpdate:'CASCADE'
    })
    service:Service
}
