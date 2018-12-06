import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { MatchGroup } from './MatchGroup';

@Entity()
export class RoundGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MatchGroup, matchGroup => matchGroup.roundGroups)
    matchGroup: MatchGroup;

    @Column()
    profileId: string;
    // TODO: add stat columns we want to track
    // TODO: add operators table in one-to-many relationship

    @CreateDateColumn()
    createdAt: Date;
}
