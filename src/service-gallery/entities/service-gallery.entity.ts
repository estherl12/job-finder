import { Service } from "src/service/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceGallery {
    @PrimaryGeneratedColumn()
    id:number

    // @Column('simple-array')
    // image:string[]

    @Column()
    image:string

    @ManyToOne(()=>Service,(service)=>service.gallery,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name:'service_id'})
    service:Service
}
