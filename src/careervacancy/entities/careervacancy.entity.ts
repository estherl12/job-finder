import { Careerapplication } from "src/careerapplications/entities/careerapplication.entity";
import { Careercategory } from "src/careercategory/entities/careercategory.entity";
import { enduser } from "src/endusers/entities/endusers.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('careervacancy')
export class Careervacancy {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    requirement:string;

    @Column()
    deadline:string;

    @OneToMany(()=>Careerapplication,(applicants)=>applicants.vacancy)
    applicants:Careerapplication

    @ManyToOne(()=>Careercategory,(careercategory)=>careercategory.vacancy,{
        // cascade:['insert','update','remove'],
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })
    @JoinColumn({name:'careercategory_id'})
    careercategory:Careercategory

    @ManyToOne(()=>enduser,(user)=>user.vacancy,{
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    @JoinColumn({name:'user_id'})
    user:enduser

}
