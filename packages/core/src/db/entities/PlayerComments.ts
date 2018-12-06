import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn } from 'typeorm';

@Entity()
export class PlayerComments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profileId: string;

    @Column()
    name: string;

    @Column()
    comment: string;

    @CreateDateColumn()
    createdAt: Date;
}
