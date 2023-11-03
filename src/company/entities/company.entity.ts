import { enduser } from "src/endusers/entities/endusers.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column()
    location:string;

    @Column()
    companytype:string

    @Column()
    companysize:string

    @OneToMany(()=>enduser,(employer)=>employer.company)
    @JoinColumn({name:'employer_id'})
    employer:enduser
    
}
