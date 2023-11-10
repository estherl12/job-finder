import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cms')
export class Cms {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    image:string

    @Column({nullable:true})
    metadescription:string

    @OneToMany(()=>Cms,(cms)=>cms.parent)
    // @JoinColumn({name:'child_id'})
    children:Cms[]

    @ManyToOne(()=>Cms,(cms)=>cms.children,{nullable:true,onDelete:'CASCADE',onUpdate:'CASCADE'},)
    @JoinColumn({name:'parent_id'})
    parent:Cms
}
