import { getToken } from '../auth';

import { TooManyIdsError } from '../../errors/ubiErrors';
import { fetch } from '../fetch';
import { URLS } from '../ubicontants';
import { map } from 'bluebird';
import { stringify } from 'querystring';
import { Platform, Region } from 'shared/constants';
import { UUID } from 'shared/interfaces';

interface ISingleProfile {
    board_id: 'pvp_ranked';
    past_season_abandons: number;
    update_time: string;
    skill_mean: number;
    abandons: number;
    season: number;
    region: Region;
    profile_id: UUID;
    past_season_losses: number;
    max_mmr: number;
    mmr: number;
    wins: number;
    skill_stdev: number;
    rank: number;
    losses: number;
    next_rank_mmr: number;
    past_seasons_wins: number;
    previous_rank_mmr: number;
    max_rank: number;
}

interface IGetRanksResponse {
    players: {
        [profileId: string]: ISingleProfile;
    };
}
interface IRanks {
    region: Region;
    abandons: number;
    losses: number;
    max_mmr: number;
    max_rank: number;
    mmr: number;
    skill_mean: number;
    skill_stdev: number;
    wins: number;
    rank: number;
}

export interface IGetRanks {
    id: UUID;
    season: number;
    apac: IRanks;
    emea: IRanks;
    ncsa: IRanks;
}

interface IGetRanksQuery {
    season_id: number;
    region_id: Region;
    profile_ids: string;
    board_id: 'pvp_ranked';
}

export interface IGetRanksOptions {
    season_id?: number;
}

const regions = [Region.APAC, Region.EMEA, Region.NCSA];

export const getRanks = async (platform: Platform, ids: UUID[], opts: IGetRanksOptions): Promise<IGetRanks[]> => {
    const query: UUID[] = ([] as UUID[]).concat(ids);
    if (query.length > 40) {
        throw new TooManyIdsError('too many ids passed (max 40)');
    }
    const token = await getToken();
    try {
        const response: IGetRanks[] = [];
        const [apac, emea, ncsa] = await map(regions, async region => {
            const defaults: Required<IGetRanksOptions> = { season_id: -1 };
            const overrides: Partial<IGetRanksQuery> = {
                region_id: region,
                profile_ids: query.join(','),
                board_id: 'pvp_ranked',
            };
            const options: Partial<IGetRanksQuery> = {
                ...defaults,
                ...opts,
                ...overrides,
            };
            const res = await fetch<IGetRanksResponse>(`${URLS[platform].RANK_URL}${stringify(options)}`)(token);
            return res.players;
        });
        query.forEach(id => {
            if (!apac[id] && !emea[id] && !ncsa[id]) {
                console.warn({ id, warning: 'Could not get ranks for player' });
            } else if (!apac[id] || !emea[id] || !ncsa[id]) {
                console.warn({ id, warning: 'Missing region from rankget', apac, emea, ncsa });
            } else {
                response.push({
                    id,
                    season: apac[id].season,
                    apac: {
                        region: Region.APAC,
                        abandons: apac[id].abandons,
                        losses: apac[id].losses,
                        max_mmr: apac[id].max_mmr,
                        max_rank: apac[id].max_rank,
                        mmr: apac[id].mmr,
                        rank: apac[id].rank,
                        skill_mean: apac[id].skill_mean,
                        skill_stdev: apac[id].skill_stdev,
                        wins: apac[id].wins,
                    },
                    emea: {
                        region: Region.EMEA,
                        abandons: emea[id].abandons,
                        losses: emea[id].losses,
                        max_mmr: emea[id].max_mmr,
                        max_rank: emea[id].max_rank,
                        mmr: emea[id].mmr,
                        rank: emea[id].rank,
                        skill_mean: emea[id].skill_mean,
                        skill_stdev: emea[id].skill_stdev,
                        wins: emea[id].wins,
                    },
                    ncsa: {
                        region: Region.NCSA,
                        abandons: ncsa[id].abandons,
                        losses: ncsa[id].losses,
                        max_mmr: ncsa[id].max_mmr,
                        max_rank: ncsa[id].max_rank,
                        mmr: ncsa[id].mmr,
                        rank: ncsa[id].rank,
                        skill_mean: ncsa[id].skill_mean,
                        skill_stdev: ncsa[id].skill_stdev,
                        wins: ncsa[id].wins,
                    },
                });
            }
        });
        return response;
    } catch (err) {
        console.error({ command: 'getRanks', err, platform, ids });
        throw err;
    }
};
