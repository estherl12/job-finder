import { Careervacancy } from "src/careervacancy/entities/careervacancy.entity";
import { enduser } from "src/endusers/entities/endusers.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('careerapplication')
export class Careerapplication {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    file:string;

    @ManyToOne(()=>Careervacancy,(vacancy)=>vacancy.applicants,{
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    @JoinColumn({name:'vacancy_id'})
    vacancy:Careervacancy

    @ManyToOne(()=>enduser,(user)=>user.applicants,{
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    @JoinColumn({name:'user_id'})
    user:enduser
}
