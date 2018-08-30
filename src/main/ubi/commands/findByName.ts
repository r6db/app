import { getToken } from '../auth';
import { Platform } from 'shared/constants';
import { fetch } from '../fetch';
import { URLS } from '../ubicontants';
const debug = (...args: any[]) => args; //  makeDebug('r6db:ubi:findByName');

type UUID = string;

interface ISingleProfile {
    profileId: UUID;
    userId: UUID;
    platformType: 'uplay' | 'psn' | 'xbl';
    idOnPlatform: UUID | string;
    nameOnPlatform: string;
}

interface IFindByNameResponse {
    profiles: ISingleProfile[];
}

export interface IFindByNameProfile {
    id: UUID;
    userId: UUID;
    name: string;
}

export const findByName = async (platform: Platform, aliases: string): Promise<IFindByNameProfile[]> => {
    const query = aliases;
    debug({ command: 'findByName', platform, aliases });
    const token = await getToken();
    try {
        const URL = `${URLS[platform].URL}${query}`;
        const res = await fetch<IFindByNameResponse>(URL)(token);
        return res.profiles.map(({ profileId, userId, nameOnPlatform }) => ({
            id: profileId,
            userId,
            name: nameOnPlatform,
        }));
    } catch (err) {
        console.error({ command: 'findByName', err, platform, aliases });
        throw err;
    }
};
