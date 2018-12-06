import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn } from 'typeorm';

@Entity()
@Unique('current_ranks_profile_id_region_season_unique_idx', ['profileId', 'season', 'region'])
export class CurrentRanks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profileId: string;

    @Column()
    region: string;

    @Column()
    season: number;

    @Column()
    skillMean: number;

    @Column()
    skillStdev: number;

    @Column()
    wins: number;

    @Column()
    losses: number;

    @Column()
    abandons: number;

    @Column()
    mmr: number;

    @Column()
    maxMmr: number;

    @Column()
    rank: number;

    @Column()
    maxRank: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    handled: boolean;
}

/*
{
    "players": {
        "78de6857-cfa7-4ec2-9f3c-b4b6e145e92f": {
            "board_id": "pvp_ranked",
            "past_seasons_abandons": 1,
            "update_time": "1970-01-01T00:00:00+00:00",
            "skill_mean": 25,
            "abandons": 0,
            "season": 11,
            "region": "emea",
            "profile_id": "78de6857-cfa7-4ec2-9f3c-b4b6e145e92f",
            "past_seasons_losses": 22,
            "max_mmr": 2500,
            "mmr": 2500,
            "wins": 0,
            "skill_stdev": 8.334,
            "rank": 0,
            "losses": 0,
            "next_rank_mmr": 0,
            "past_seasons_wins": 90,
            "previous_rank_mmr": 0,
            "max_rank": 0
        }
    }
}
 */
