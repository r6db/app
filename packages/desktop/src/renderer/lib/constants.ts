import s0Logo from 'renderer/assets/seasonlogos/R6-Default-Horizontal.svg';
import s1Cover from 'renderer/assets/backgrounds/blackice1.jpg';
import s1Logo from 'renderer/assets/seasonlogos/R6-OPBlackIce-Horizontal.svg';
import s2Cover from 'renderer/assets/backgrounds/dustline1.jpg';
import s2Logo from 'renderer/assets/seasonlogos/R6-OPDustLine-Horizontal.svg';
import s3Cover from 'renderer/assets/backgrounds/skullrain1.jpg';
import s3Logo from 'renderer/assets/seasonlogos/R6-OPSkullRain-Horizontal.svg';
import s4Cover from 'renderer/assets/backgrounds/redcrow1.jpg';
import s4Logo from 'renderer/assets/seasonlogos/R6-OPRedCrow-Horizontal.svg';
import s5Cover from 'renderer/assets/backgrounds/velvetshell1.jpg';
import s5Logo from 'renderer/assets/seasonlogos/R6-OPVelvetShell-Horizontal.svg';
import s6Cover from 'renderer/assets/backgrounds/ophealth1.jpg';
import s6Logo from 'renderer/assets/seasonlogos/R6-OPHealth-Horizontal.svg';
import s7Cover from 'renderer/assets/backgrounds/bloodorchid1.jpg';
import s7Logo from 'renderer/assets/seasonlogos/R6-OPBloodOrchid-Horizontal.svg';
import s8Cover from 'renderer/assets/backgrounds/whitenoise1.jpg';
import s8Logo from 'renderer/assets/seasonlogos/R6-OPWhiteNoise-Horizontal.svg';
import s9Cover from 'renderer/assets/backgrounds/chimera2.jpg';
import s9Logo from 'renderer/assets/seasonlogos/R6-OPChimera-Horizontal.svg';
import s10Cover from 'renderer/assets/backgrounds/parabellum2.jpg';
import s10Logo from 'renderer/assets/seasonlogos/R6-OPParaBellum-Horizontal.svg';

export const languages = {
    en: { label: 'english', messageFn: () => import('renderer/i18n/en.json') },
};

/**
 * the api returns ranks in a number format
 * we can use that number as index to get the label
 */
export const RANKS = [
    'Unranked',
    'Copper 4',
    'Copper 3',
    'Copper 2',
    'Copper 1',
    'Bronze 4',
    'Bronze 3',
    'Bronze 2',
    'Bronze 1',
    'Silver 4',
    'Silver 3',
    'Silver 2',
    'Silver 1',
    'Gold 4',
    'Gold 3',
    'Gold 2',
    'Gold 1',
    'Platinum 3',
    'Platinum 2',
    'Platinum 1',
    'Diamond',
];

interface ISeason {
    id: number;
    fullId: string;
    name: string;
    dateStart: Date | null;
    dateEnd: Date | null;
    cover: { src: string; srcSet: string; placeholder: string } | null;
    logo: any;
}
export const SEASONS: ISeason[] = [
    {
        id: 0,
        fullId: 'Y1S0',
        name: 'Release',
        dateStart: new Date('2016-12-01'),
        dateEnd: new Date('2017-02-01'),
        cover: null,
        logo: s0Logo,
    },
    {
        id: 1,
        fullId: 'Y1S1',
        name: 'Black Ice',
        dateStart: null,
        dateEnd: null,
        cover: s1Cover,
        logo: s1Logo,
    },
    {
        id: 2,
        fullId: 'Y1S2',
        name: 'Dust Line',
        dateStart: null,
        dateEnd: null,
        cover: s2Cover,
        logo: s2Logo,
    },
    {
        id: 3,
        fullId: 'Y1S3',
        name: 'Skull Rain',
        dateStart: null,
        dateEnd: null,
        cover: s3Cover,
        logo: s3Logo,
    },
    {
        id: 4,
        fullId: 'Y1S4',
        name: 'Red Crow',
        dateStart: null,
        dateEnd: null,
        cover: s4Cover,
        logo: s4Logo,
    },
    {
        id: 5,
        fullId: 'Y2S1',
        name: 'Velvet Shell',
        dateStart: null,
        dateEnd: null,
        cover: s5Cover,
        logo: s5Logo,
    },
    {
        id: 6,
        fullId: 'Y2S2',
        name: 'Health',
        dateStart: null,
        dateEnd: null,
        cover: s6Cover,
        logo: s6Logo,
    },
    {
        id: 7,
        fullId: 'Y2S3',
        name: 'Blood Orchid',
        dateStart: null,
        dateEnd: null,
        cover: s7Cover,
        logo: s7Logo,
    },
    {
        id: 8,
        fullId: 'Y2S4',
        name: 'White Noise',
        dateStart: null,
        dateEnd: null,
        cover: s8Cover,
        logo: s8Logo,
    },
    {
        id: 9,
        fullId: 'Y3S1',
        name: 'Chimera',
        dateStart: null,
        dateEnd: null,
        cover: s9Cover,
        logo: s9Logo,
    },
    {
        id: 10,
        fullId: 'Y3S2',
        name: 'Para Bellum',
        dateStart: null,
        dateEnd: null,
        cover: s10Cover,
        logo: s10Logo,
    },
];

export const OPERATORS = {
    ash: { name: 'Ash', side: 'Attack', unit: 'FBI' },
    bandit: { name: 'Bandit', side: 'Defense', unit: 'GSG9' },
    blackbeard: { name: 'Blackbeard', side: 'Attack', unit: 'SEALS' },
    blitz: { name: 'Blitz', side: 'Attack', unit: 'GSG9' },
    buck: { name: 'Buck', side: 'Attack', unit: 'JTF-2' },
    capitao: { name: 'Capitão', side: 'Attack', unit: 'BOPE' },
    castle: { name: 'Castle', side: 'Defense', unit: 'FBI' },
    caveira: { name: 'Caveira', side: 'Defense', unit: 'BOPE' },
    doc: { name: 'Doc', side: 'Defense', unit: 'GIGN' },
    echo: { name: 'Echo', side: 'Defense', unit: 'SAT' },
    ela: { name: 'Ela', side: 'Defense', unit: 'GROM' },
    frost: { name: 'Frost', side: 'Defense', unit: 'JTF-2' },
    fuze: { name: 'Fuze', side: 'Attack', unit: 'SPETSNAZ' },
    glaz: { name: 'Glaz', side: 'Attack', unit: 'SPETSNAZ' },
    hibana: { name: 'Hibana', side: 'Attack', unit: 'SAT' },
    iq: { name: 'IQ', side: 'Attack', unit: 'GSG9' },
    jackal: { name: 'Jackal', side: 'Attack', unit: 'GEO' },
    jager: { name: 'Jäger', side: 'Defense', unit: 'GSG9' },
    kapkan: { name: 'Kapkan', side: 'Defense', unit: 'SPETSNAZ' },
    lesion: { name: 'Lesion', side: 'Defense', unit: 'SDU' },
    mira: { name: 'Mira', side: 'Defense', unit: 'GEO' },
    montagne: { name: 'Montagne', side: 'Attack', unit: 'GIGN' },
    mute: { name: 'Mute', side: 'Defense', unit: 'SAS' },
    pulse: { name: 'Pulse', side: 'Defense', unit: 'FBI' },
    rook: { name: 'Rook', side: 'Defense', unit: 'GIGN' },
    sledge: { name: 'Sledge', side: 'Attack', unit: 'SAS' },
    smoke: { name: 'Smoke', side: 'Defense', unit: 'SAS' },
    tachanka: { name: 'Tachanka', side: 'Defense', unit: 'SPETSNAZ' },
    thatcher: { name: 'Thatcher', side: 'Attack', unit: 'SAS' },
    thermite: { name: 'Thermite', side: 'Attack', unit: 'FBI' },
    twitch: { name: 'Twitch', side: 'Attack', unit: 'GIGN' },
    valkyrie: { name: 'Valkyrie', side: 'Defense', unit: 'SEALS' },
    ying: { name: 'Ying', side: 'Attack', unit: 'SDU' },
    dokkaebi: { name: 'Dokkaebi', side: 'Attack', unit: 'SMB' },
    vigil: { name: 'Vigil', side: 'Defense', unit: 'SMB' },
    zofia: { name: 'Zofia', side: 'Attack', unit: 'GROM' },
    lion: { name: 'Lion', side: 'Attack', unit: 'CBRN' },
    finka: { name: 'Finka', side: 'Attack', unit: 'CBRN' },
    alibi: { name: 'Alibi', side: 'Defense', unit: 'GIS' },
    maestro: { name: 'Maestro', side: 'Defense', unit: 'GIS' },
    recruitsas: { name: 'Recruit (SAS)', side: 'Recruit', unit: 'SAS' },
    recruitfbi: { name: 'Recruit (FBI)', side: 'Recruit', unit: 'FBI' },
    recruitgign: { name: 'Recruit (GIGN)', side: 'Recruit', unit: 'GIGN' },
    recruitspetsnaz: { name: 'Recruit (SPETSNAZ)', side: 'Recruit', unit: 'SPETSNAZ' },
    recruitgsg9: { name: 'Recruit (GSG9)', side: 'Recruit', unit: 'GSG9' },
};

export const REGIONS = {
    emea: 'Europe',
    ncsa: 'America',
    apac: 'Asia',
};
