import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from "@nestjs/class-transformer";
import { commentEntity } from "src/comment/entity/comment.entity";
import { blogEntity } from "src/users/entities/blog.entity";
import { Role } from "src/auth/enum/role.enum";
import { Careervacancy } from "src/careervacancy/entities/careervacancy.entity";
import { Careercategory } from "src/careercategory/entities/careercategory.entity";
import { Careerapplication } from "src/careerapplications/entities/careerapplication.entity";
import { Company } from "src/company/entities/company.entity";

@Exclude()
@Entity()
export class enduser{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:null})
    name:string;

    @Column()
    @Expose()
    email:string;

    @Column()
    password:string;

    @Column()
    @Expose()
    mobile:string;

    @Column({default:null , nullable:true})
    accesstoken:string;

    @Column({nullable:true,default:Role.Applicant})
    role:Role

    @OneToMany(()=>blogEntity,(blog)=>blog.users,{
        cascade: ["insert", "update"]
    })
    blog:blogEntity

    @OneToMany(()=>commentEntity,(comments)=>comments.users)
    // cascade: ["insert", "update"]
    comments:commentEntity;

    @OneToMany(()=>Careervacancy,(vacancy)=>vacancy.user)
    vacancy:Careervacancy

    @OneToMany(()=>Careercategory,(careercategory)=>careercategory.user,{
        onUpdate:'CASCADE'
    })
    careercategory:Careercategory

    @OneToMany(()=>Careerapplication,(applicants)=>applicants.user)
    applicants:Careerapplication

    @OneToMany(()=>Company,(company)=>company.employer,{nullable:true})
    @JoinColumn({name:'company_id'})
    company:Company
}