import { getToken } from '../auth';

import { Platform } from 'shared/constants';
import { TooManyIdsError } from '../../errors/ubiErrors';
import { fetch } from '../fetch';
import { URLS } from '../ubicontants';

type UUID = string;

interface ISingleProfile {
    level: number;
    lootbox_probability: number;
    profile_id: UUID | string;
    xp: number;
}

interface IGetCurrentLevelResponse {
    player_profiles: ISingleProfile[];
}

export interface IGetCurrentLevel {
    id: UUID;
    level: number;
}

export const getLevel = async (platform: Platform, ids: UUID[]): Promise<IGetCurrentLevel[]> => {
    const query = ([] as UUID[]).concat(ids);
    if (query.length > 40) {
        throw new TooManyIdsError('too many ids passed (max 40)');
    }
    const token = await getToken();
    try {
        const URL = `${URLS[platform].LEVEL_URL}${query.join(',')}`;
        const res = await fetch<IGetCurrentLevelResponse>(URL)(token);
        return res.player_profiles.map(({ profile_id, level }) => ({
            id: profile_id,
            level,
        }));
    } catch (err) {
        throw err;
    }
};
