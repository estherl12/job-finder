import { enduser } from "src/endusers/entities/endusers.entity";
import { Service } from "src/service/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceBooking {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    mobile:string;

    // @Column()
    // address:string;

    @Column()
    message:string;

    @ManyToOne(()=>Service,(service)=>service.booking,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name:'service_id'})
    service:Service

    @ManyToOne(()=>enduser,(user)=>user.booking)
    @JoinColumn({name:'user_id'})
    user:enduser
}
