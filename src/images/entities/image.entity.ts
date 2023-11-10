import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    image:string

    @Column()
    category:string
}
