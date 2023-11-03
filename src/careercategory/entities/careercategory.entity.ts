import { Careervacancy } from "src/careervacancy/entities/careervacancy.entity";
import { enduser } from "src/endusers/entities/endusers.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('careercategory')
export class Careercategory {
@PrimaryGeneratedColumn()
id:number;

@Column()
sector:string

@OneToMany(()=>Careervacancy,(vacancy)=>vacancy.careercategory,{
    // cascade:['insert','remove','update']
})
vacancy:Careervacancy

@ManyToOne(()=>enduser,(user)=>user.careercategory,{
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
})
@JoinColumn({name:'user_id'})
user:enduser
}
