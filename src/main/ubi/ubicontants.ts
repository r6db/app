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

export type operatorname =
    | 'recruitsas'
    | 'recruitfbi'
    | 'recruitgign'
    | 'recruitspetsnaz'
    | 'recruitgsg9'
    | 'smoke'
    | 'mute'
    | 'sledge'
    | 'thatcher'
    | 'castle'
    | 'ash'
    | 'pulse'
    | 'thermite'
    | 'doc'
    | 'rook'
    | 'twitch'
    | 'montagne'
    | 'glaz'
    | 'fuze'
    | 'kapkan'
    | 'tachanka'
    | 'blitz'
    | 'iq'
    | 'jager'
    | 'bandit'
    | 'buck'
    | 'frost'
    | 'blackbeard'
    | 'valkyrie'
    | 'capitao'
    | 'caveira'
    | 'hibana'
    | 'echo'
    | 'jackal'
    | 'mira'
    | 'ying'
    | 'lesion'
    | 'ela'
    | 'zofia'
    | 'vigil'
    | 'dokkaebi'
    | 'lion'
    | 'finka'
    | 'maestro'
    | 'alibi';

interface IOperator {
    name: operatorname;
    readableName: string;
    fullIndex: string;
}

export const OPERATORS: IOperator[] = [
    {
        name: 'recruitsas',
        readableName: 'SAS Recruit',
        fullIndex: '1:1',
    },
    {
        name: 'recruitfbi',
        readableName: 'FBI Recruit',
        fullIndex: '1:2',
    },
    {
        name: 'recruitgign',
        readableName: 'GIGN Recruit',
        fullIndex: '1:3',
    },
    {
        name: 'recruitspetsnaz',
        readableName: 'Spetsnaz Recruit',
        fullIndex: '1:4',
    },
    {
        name: 'recruitgsg9',
        readableName: 'GSG9 Recruit',
        fullIndex: '1:5',
    },
    {
        name: 'smoke',
        readableName: 'Smoke',
        fullIndex: '2:1',
    },
    {
        name: 'mute',
        readableName: 'Mute',
        fullIndex: '3:1',
    },
    {
        name: 'sledge',
        readableName: 'Sledge',
        fullIndex: '4:1',
    },
    {
        name: 'thatcher',
        readableName: 'Thatcher',
        fullIndex: '5:1',
    },
    {
        name: 'castle',
        readableName: 'Castle',
        fullIndex: '2:2',
    },
    {
        name: 'ash',
        readableName: 'Ash',
        fullIndex: '3:2',
    },
    {
        name: 'pulse',
        readableName: 'Pulse',
        fullIndex: '4:2',
    },
    {
        name: 'thermite',
        readableName: 'Thermite',
        fullIndex: '5:2',
    },
    {
        name: 'doc',
        readableName: 'Doc',
        fullIndex: '2:3',
    },
    {
        name: 'rook',
        readableName: 'Rook',
        fullIndex: '3:3',
    },
    {
        name: 'twitch',
        readableName: 'Twitch',
        fullIndex: '4:3',
    },
    {
        name: 'montagne',
        readableName: 'Montagne',
        fullIndex: '5:3',
    },
    {
        name: 'glaz',
        readableName: 'Glaz',
        fullIndex: '2:4',
    },
    {
        name: 'fuze',
        readableName: 'Fuze',
        fullIndex: '3:4',
    },
    {
        name: 'kapkan',
        readableName: 'Kapkan',
        fullIndex: '4:4',
    },
    {
        name: 'tachanka',
        readableName: 'Tachanka',
        fullIndex: '5:4',
    },
    {
        name: 'blitz',
        readableName: 'Blitz',
        fullIndex: '2:5',
    },
    {
        name: 'iq',
        readableName: 'IQ',
        fullIndex: '3:5',
    },
    {
        name: 'jager',
        readableName: 'Jäger',
        fullIndex: '4:5',
    },
    {
        name: 'bandit',
        readableName: 'Bandit',
        fullIndex: '5:5',
    },
    {
        name: 'buck',
        readableName: 'Buck',
        fullIndex: '2:6',
    },
    {
        name: 'frost',
        readableName: 'Frost',
        fullIndex: '3:6',
    },
    {
        name: 'blackbeard',
        readableName: 'Blackbeard',
        fullIndex: '2:7',
    },
    {
        name: 'valkyrie',
        readableName: 'Valkyrie',
        fullIndex: '3:7',
    },
    {
        name: 'capitao',
        readableName: 'Capitão',
        fullIndex: '2:8',
    },
    {
        name: 'caveira',
        readableName: 'Caveira',
        fullIndex: '3:8',
    },
    {
        name: 'hibana',
        readableName: 'Hibana',
        fullIndex: '2:9',
    },
    {
        name: 'echo',
        readableName: 'Echo',
        fullIndex: '3:9',
    },
    {
        name: 'jackal',
        readableName: 'Jackal',
        fullIndex: '2:A',
    },
    {
        name: 'mira',
        readableName: 'Mira',
        fullIndex: '3:A',
    },
    {
        name: 'ying',
        readableName: 'Ying',
        fullIndex: '2:B',
    },
    {
        name: 'lesion',
        readableName: 'Lesion',
        fullIndex: '3:B',
    },
    {
        name: 'ela',
        readableName: 'Ela',
        fullIndex: '2:C',
    },
    {
        name: 'zofia',
        readableName: 'Zofia',
        fullIndex: '3:C',
    },
    {
        name: 'vigil',
        readableName: 'Vigil',
        fullIndex: '3:D',
    },
    {
        name: 'dokkaebi',
        readableName: 'Dokkaebi',
        fullIndex: '2:D',
    },
    {
        name: 'lion',
        readableName: 'Lion',
        fullIndex: '3:E',
    },
    {
        name: 'finka',
        readableName: 'Finka',
        fullIndex: '4:E',
    },
    {
        name: 'maestro',
        readableName: 'Maestro',
        fullIndex: '2:F',
    },
    {
        name: 'alibi',
        readableName: 'Alibi',
        fullIndex: '3:F',
    },
];
