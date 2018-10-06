// tslint:disable:max-line-length
export const LOGIN_URL = 'https://uplayconnect.ubi.com/ubiservices/v2/profiles/sessions?';

export const URLS: IUrl = {
    PC: {
        URL: 'https://uplayoverlay.ubi.com/ubiservices/v1/profiles?platformType=uplay&nameOnPlatform=',
        STATS_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/playerstats2/statistics?',
        LEVEL_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/r6playerprofile/playerprofile/progressions?profile_ids=',
        REVERSE_URL: 'https://uplayoverlay.ubi.com/ubiservices/v2/profiles?platformType=uplay&idOnPlatform=',
        TIME_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/playerstats2/statistics?statistics=casualpvp_timeplayed,rankedpvp_timeplayed&populations=',
        RANK_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/r6karma/players?',
    },
    PS4: {
        URL: 'https://uplayoverlay.ubi.com/ubiservices/v1/profiles?platformType=psn&nameOnPlatform=',
        STATS_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/playerstats2/statistics?',
        LEVEL_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/r6playerprofile/playerprofile/progressions?profile_ids=',
        REVERSE_URL: 'https://uplayoverlay.ubi.com/ubiservices/v2/profiles?platformType=psn&idOnPlatform=',
        TIME_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/playerstats2/statistics?statistics=casualpvp_timeplayed,rankedpvp_timeplayed&populations=',
        RANK_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/r6karma/players?',
    },
    XBOX: {
        URL: 'https://uplayoverlay.ubi.com/ubiservices/v1/profiles?platformType=xbl&nameOnPlatform=',
        STATS_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/playerstats2/statistics?',
        LEVEL_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/r6playerprofile/playerprofile/progressions?profile_ids=',
        REVERSE_URL: 'https://uplayoverlay.ubi.com/ubiservices/v2/profiles?platformType=xbl&idOnPlatform=',
        TIME_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/playerstats2/statistics?statistics=casualpvp_timeplayed,rankedpvp_timeplayed&populations=',
        RANK_URL:
            'https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/r6karma/players?',
    },
};

interface IUrl {
    [platform: string]: {
        URL: string;
        STATS_URL: string;
        LEVEL_URL: string;
        REVERSE_URL: string;
        TIME_URL: string;
        RANK_URL: string;
    };
}
