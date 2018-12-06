import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn } from 'typeorm';

@Entity()
export class RanksSnapshots {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profileId: string;

    @Column()
    season: number;

    @Column()
    apacSkillMean: number;

    @Column()
    apacSkillStdev: number;

    @Column()
    apacWins: number;

    @Column()
    apacLosses: number;

    @Column()
    apacAbandons: number;

    @Column()
    apacMmr: number;

    @Column()
    apacMaxMmr: number;

    @Column()
    apacRank: number;

    @Column()
    apacMaxRank: number;

    @Column()
    emeaSkillMean: number;

    @Column()
    emeaSkillStdev: number;

    @Column()
    emeaWins: number;

    @Column()
    emeaLosses: number;

    @Column()
    emeaAbandons: number;

    @Column()
    emeaMmr: number;

    @Column()
    emeaMaxMmr: number;

    @Column()
    emeaRank: number;

    @Column()
    emeaMaxRank: number;

    @Column()
    ncsaSkillMean: number;

    @Column()
    ncsaSkillStdev: number;

    @Column()
    ncsaWins: number;

    @Column()
    ncsaLosses: number;

    @Column()
    ncsaAbandons: number;

    @Column()
    ncsaMmr: number;

    @Column()
    ncsaMaxMmr: number;

    @Column()
    ncsaRank: number;

    @Column()
    ncsaMaxRank: number;

    @Column({ default: false })
    isHandled: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
