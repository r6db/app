import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { RoundGroup } from './RoundGroup';

@Entity()
export class MatchGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profileId: string;

    @Column()
    queue: string;

    @OneToMany(() => RoundGroup, roundGroup => roundGroup.matchGroup)
    roundGroups: RoundGroup[];

    @CreateDateColumn()
    createdAt: Date;
}
