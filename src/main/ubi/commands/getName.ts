import { getToken } from '../auth';

import { fetch } from '../fetch';
import { TooManyIdsError } from '../../errors/ubiErrors';
import { URLS } from '../ubicontants';
import { Platform } from 'shared/constants';
const debug = (...args: any[]) => args; // makeDebug('r6db:ubi:getName');

type UUID = string;

interface ISingleProfile {
    profileId: UUID;
    userId: UUID;
    platformType: 'uplay' | 'psn' | 'xbl';
    idOnPlatform: UUID | string;
    nameOnPlatform: string;
}

/*
idOnPlatform
:
"78DE6857-CFA7-4EC2-9F3C-B4B6E145E92F"
nameOnPlatform
:
"NutEMuppet"
platformType
:
"uplay"
profileId
:
"78de6857-cfa7-4ec2-9f3c-b4b6e145e92f"
userId
:
"78de6857-cfa7-4ec2-9f3c-b4b6e145e92f"
 */

interface IGetCurrentNameResponse {
    profiles: ISingleProfile[];
}

export interface IGetCurrentName {
    id: UUID;
    userId: UUID;
    name: string;
}

export const getName = async (platform: Platform, ids: UUID[]): Promise<IGetCurrentName[]> => {
    const query = ([] as UUID[]).concat(ids);
    if (query.length > 40) {
        throw new TooManyIdsError('too many ids passed (max 40)');
    }
    debug({ command: 'getCurrentName', platform, ids });
    const token = await getToken();
    try {
        const res = await fetch<IGetCurrentNameResponse>(`${URLS[platform].REVERSE_URL}${query.join(',')}`)(token);
        debug(res);
        return res.profiles.filter(x => ids.includes(x.userId)).map(({ profileId, userId, nameOnPlatform }) => ({
            id: profileId,
            userId,
            name: nameOnPlatform,
        }));
    } catch (err) {
        console.error({ command: 'getCurrentName', err, platform, ids });
        throw err;
    }
};
