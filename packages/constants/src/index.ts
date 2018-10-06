export const name = 'r6db';
export enum Platform {
    PC = 'PC',
    PS4 = 'PS4',
    XBOX = 'XB1',
    ALL = 'ALL',
}

export enum Region {
    APAC = 'apac',
    EMEA = 'emea',
    NCSA = 'ncsa',
}

export const WEAPONTYPES = {
    1: 'assault',
    2: 'smg',
    3: 'lmg',
    4: 'sniper',
    5: 'pistol',
    6: 'shotgun',
    7: 'mp',
    8: 'shield',
    9: 'launcher',
    B: 'B',
};

export type Operatorname =
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

export const OPERATORS = [
    {
        id: 'recruit-sas',
        name: 'recruitsas',
        readableName: 'SAS Recruit',
        fullIndex: '1:1',
        gadget: null,
    },
    {
        id: 'recruit-fbi-swat',
        name: 'recruitfbi',
        readableName: 'FBI Recruit',
        fullIndex: '1:2',
        gadget: null,
    },
    {
        id: 'recruit-gign',
        name: 'recruitgign',
        readableName: 'GIGN Recruit',
        fullIndex: '1:3',
        gadget: null,
    },
    {
        id: 'recruit-spetsnaz',
        name: 'recruitspetsnaz',
        readableName: 'Spetsnaz Recruit',
        fullIndex: '1:4',
        gadget: null,
    },
    {
        id: 'recruit-gsg9',
        name: 'recruitgsg9',
        readableName: 'GSG9 Recruit',
        fullIndex: '1:5',
        gadget: null,
    },
    {
        id: 'smoke-sas',
        name: 'smoke',
        readableName: 'Smoke',
        fullIndex: '2:1',
        gadget: 'operatorpvp_smoke_poisongaskill',
    },
    {
        id: 'mute-sas',
        name: 'mute',
        readableName: 'Mute',
        fullIndex: '3:1',
        gadget: 'operatorpvp_mute_gadgetjammed',
    },
    {
        id: 'sledge-sas',
        name: 'sledge',
        readableName: 'Sledge',
        fullIndex: '4:1',
        gadget: 'operatorpvp_sledge_hammerhole',
    },
    {
        id: 'thatcher-sas',
        name: 'thatcher',
        readableName: 'Thatcher',
        fullIndex: '5:1',
        gadget: 'operatorpvp_thatcher_gadgetdestroywithemp',
    },
    {
        id: 'castle-fbi-swat',
        name: 'castle',
        readableName: 'Castle',
        fullIndex: '2:2',
        gadget: 'operatorpvp_castle_kevlarbarricadedeployed',
    },
    {
        id: 'ash-fbi-swat',
        name: 'ash',
        readableName: 'Ash',
        fullIndex: '3:2',
        gadget: 'operatorpvp_ash_bonfirewallbreached',
    },
    {
        id: 'pulse-fbi-swat',
        name: 'pulse',
        readableName: 'Pulse',
        fullIndex: '4:2',
        gadget: 'operatorpvp_pulse_heartbeatspot',
    },
    {
        id: 'thermite-fbi-swat',
        name: 'thermite',
        readableName: 'Thermite',
        fullIndex: '5:2',
        gadget: 'operatorpvp_thermite_reinforcementbreached',
    },
    {
        id: 'doc-gign',
        name: 'doc',
        readableName: 'Doc',
        fullIndex: '2:3',
        gadget: 'operatorpvp_doc_teammaterevive',
    },
    {
        id: 'rook-gign',
        name: 'rook',
        readableName: 'Rook',
        fullIndex: '3:3',
        gadget: 'operatorpvp_rook_armortakenteammate',
    },
    {
        id: 'twitch-gign',
        name: 'twitch',
        readableName: 'Twitch',
        fullIndex: '4:3',
        gadget: 'operatorpve_twitch_gadgetdestroybyshockdrone',
    },
    {
        id: 'montagne-gign',
        name: 'montagne',
        readableName: 'Montagne',
        fullIndex: '5:3',
        gadget: 'operatorpvp_montagne_shieldblockdamage',
    },
    {
        id: 'glaz-spetsnaz',
        name: 'glaz',
        readableName: 'Glaz',
        fullIndex: '2:4',
        gadget: 'operatorpvp_glaz_sniperkill',
    },
    {
        id: 'fuze-spetsnaz',
        name: 'fuze',
        readableName: 'Fuze',
        fullIndex: '3:4',
        gadget: 'operatorpvp_fuze_clusterchargekill',
    },
    {
        id: 'kapkan-spetsnaz',
        name: 'kapkan',
        readableName: 'Kapkan',
        fullIndex: '4:4',
        gadget: 'operatorpvp_kapkan_boobytrapkill',
    },
    {
        id: 'tachanka-spetsnaz',
        name: 'tachanka',
        readableName: 'Tachanka',
        fullIndex: '5:4',
        gadget: 'operatorpvp_tachanka_turretkill',
    },
    {
        id: 'blitz-gsg-9',
        name: 'blitz',
        readableName: 'Blitz',
        fullIndex: '2:5',
        gadget: 'operatorpvp_blitz_flashedenemy',
    },
    {
        id: 'iq-gsg-9',
        name: 'iq',
        readableName: 'IQ',
        fullIndex: '3:5',
        gadget: 'operatorpvp_iq_gadgetspotbyef',
    },
    {
        id: 'jager-gsg-9',
        name: 'jager',
        readableName: 'Jäger',
        fullIndex: '4:5',
        gadget: 'operatorpvp_jager_gadgetdestroybycatcher',
    },
    {
        id: 'bandit-gsg-9',
        name: 'bandit',
        readableName: 'Bandit',
        fullIndex: '5:5',
        gadget: 'operatorpvp_bandit_batterykill',
    },
    {
        id: 'buck-jtf2',
        name: 'buck',
        readableName: 'Buck',
        fullIndex: '2:6',
        gadget: 'operatorpvp_buck_kill',
    },
    {
        id: 'frost-jtf2',
        name: 'frost',
        readableName: 'Frost',
        fullIndex: '3:6',
        gadget: 'operatorpvp_frost_dbno',
    },
    {
        id: 'blackbeard-navy-seal',
        name: 'blackbeard',
        readableName: 'Blackbeard',
        fullIndex: '2:7',
        gadget: 'operatorpvp_blackbeard_gunshieldblockdamage',
    },
    {
        id: 'valkyrie-navy-seal',
        name: 'valkyrie',
        readableName: 'Valkyrie',
        fullIndex: '3:7',
        gadget: 'operatorpvp_valkyrie_camdeployed',
    },
    {
        id: 'capitao-bope',
        name: 'capitao',
        readableName: 'Capitão',
        fullIndex: '2:8',
        gadget: 'operatorpvp_capitao_lethaldartkills',
    },
    {
        id: 'caveira-bope',
        name: 'caveira',
        readableName: 'Caveira',
        fullIndex: '3:8',
        gadget: 'operatorpvp_caveira_interrogations',
    },
    {
        id: 'hibana-sat',
        name: 'hibana',
        readableName: 'Hibana',
        fullIndex: '2:9',
        gadget: 'operatorpvp_hibana_detonate_projectile',
    },
    {
        id: 'echo-sat',
        name: 'echo',
        readableName: 'Echo',
        fullIndex: '3:9',
        gadget: 'operatorpvp_echo_enemy_sonicburst_affected',
    },
    {
        id: 'jackal-geo',
        name: 'jackal',
        readableName: 'Jackal',
        fullIndex: '2:A',
        gadget: 'operatorpvp_cazador_assist_kill',
    },
    {
        id: 'mira-geo',
        name: 'mira',
        readableName: 'Mira',
        fullIndex: '3:A',
        gadget: 'operatorpvp_black_mirror_gadget_deployed',
    },
    {
        id: 'ying-sat',
        name: 'ying',
        readableName: 'Ying',
        fullIndex: '2:B',
        gadget: 'operatorpvp_dazzler_gadget_detonate',
    },
    {
        id: 'lesion-sat',
        name: 'lesion',
        readableName: 'Lesion',
        fullIndex: '3:B',
        gadget: 'operatorpvp_caltrop_enemy_affected',
    },
    {
        id: 'ela-grom',
        name: 'ela',
        readableName: 'Ela',
        fullIndex: '2:C',
        gadget: 'operatorpvp_concussionmine_detonate',
    },
    {
        id: 'zofia-grom',
        name: 'zofia',
        readableName: 'Zofia',
        fullIndex: '3:C',
        gadget: 'operatorpvp_concussiongrenade_detonate',
    },
    {
        id: 'vigil-707th-smb',
        name: 'vigil',
        readableName: 'Vigil',
        fullIndex: '3:D',
        gadget: 'operatorpvp_attackerdrone_diminishedrealitymode',
    },
    {
        id: 'dokkaebi-707th-smb',
        name: 'dokkaebi',
        readableName: 'Dokkaebi',
        fullIndex: '2:D',
        gadget: 'disaplaceholder',
    },
    {
        id: 'Lion-gign',
        name: 'lion',
        readableName: 'Lion',
        fullIndex: '3:E',
        gadget: 'operatorpvp_tagger_tagdevice_spot',
    },
    {
        id: 'Finka-spetsnaz',
        name: 'finka',
        readableName: 'Finka',
        fullIndex: '4:E',
        gadget: 'operatorpvp_rush_adrenalinerush',
    },
    {
        id: 'Maestro-gis',
        name: 'maestro',
        readableName: 'Maestro',
        fullIndex: '2:F',
        gadget: 'operatorpvp_tagger_tagdevice_spot',
    },
    {
        id: 'Alibi-gis',
        name: 'alibi',
        readableName: 'Alibi',
        fullIndex: '3:F',
        gadget: 'operatorpvp_rush_adrenalinerush',
    },
];
