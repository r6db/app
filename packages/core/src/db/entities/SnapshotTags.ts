import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['profileId', 'rankSnapshotId'])
export class SnapshotTags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profileId: string;

    @Column()
    name: string;

    @Column()
    rankSnapshotId: number;

    @Column()
    statsSnapshotId: number;

    @CreateDateColumn()
    createdAt: Date;
}
