import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class StatsSnapshots {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profileId: string;

    @Column()
    casualKills: number;

    @Column()
    casualDeaths: number;

    @Column()
    casualMatchLost: number;

    @Column()
    casualMatchPlayed: number;

    @Column()
    casualMatchWon: number;

    @Column()
    casualTimePlayed: number;

    @Column()
    generalBulletsFired: number;

    @Column()
    generalBulletsHit: number;

    @Column()
    generalHeadshot: number;

    @Column()
    generalDeaths: number;

    @Column()
    generalKillAssists: number;

    @Column()
    generalKills: number;

    @Column()
    generalMatchLost: number;

    @Column()
    generalMatchPlayed: number;

    @Column()
    generalMatchWon: number;

    @Column()
    generalMeleeKills: number;

    @Column()
    generalPenetrationKills: number;

    @Column()
    generalRevive: number;

    @Column()
    generalTimePlayed: number;

    @Column()
    generalBlindKills: number;

    @Column()
    generalDbno: number;

    @Column()
    generalDbnoAssists: number;

    @Column()
    generalGadgetDestroy: number;

    @Column()
    generalRappelBreach: number;

    @Column()
    generalReviveDenied: number;

    @Column()
    generalSuicide: number;

    @Column()
    rankedKills: number;

    @Column()
    rankedDeaths: number;

    @Column()
    rankedMatchLost: number;

    @Column()
    rankedMatchPlayed: number;

    @Column()
    rankedMatchWon: number;

    @Column()
    rankedTimePlayed: number;

    @Column()
    secureBestScore: number;

    @Column()
    secureMatchLost: number;

    @Column()
    secureMatchPlayed: number;

    @Column()
    secureMatchWon: number;

    @Column()
    secureAggression: number;

    @Column()
    secureDefense: number;

    @Column()
    secureHacked: number;

    @Column()
    hostageBestScore: number;

    @Column()
    hostageMatchLost: number;

    @Column()
    hostageMatchPlayed: number;

    @Column()
    hostageMatchWon: number;

    @Column()
    hostageDefense: number;

    @Column()
    hostageRescue: number;

    @Column()
    bombBestScore: number;

    @Column()
    bombMatchLost: number;

    @Column()
    bombMatchPlayed: number;

    @Column()
    bombMatchWon: number;

    @Column()
    operators: string;

    @Column({ default: false })
    isHandled: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
