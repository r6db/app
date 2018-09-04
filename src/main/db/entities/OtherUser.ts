import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OtherUser {
    @PrimaryGeneratedColumn()
    protected id: number;

    @Column()
    protected title: string;

    @Column()
    protected text: string;
}
