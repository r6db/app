import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    protected id: number;

    @Column()
    protected title: string;

    @Column()
    protected text: string;
}
