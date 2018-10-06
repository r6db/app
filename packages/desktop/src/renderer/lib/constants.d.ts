export declare const languages: {
    en: {
        label: string;
        messageFn: () => Promise<any>;
    };
};
/**
 * the api returns ranks in a number format
 * we can use that number as index to get the label
 */
export declare const RANKS: string[];
interface ISeason {
    id: number;
    fullId: string;
    name: string;
    dateStart: Date | null;
    dateEnd: Date | null;
    cover: {
        src: string;
        srcSet: string;
        placeholder: string;
    } | null;
    logo: any;
}
export declare const SEASONS: ISeason[];
export declare const OPERATORS: {
    ash: {
        name: string;
        side: string;
        unit: string;
    };
    bandit: {
        name: string;
        side: string;
        unit: string;
    };
    blackbeard: {
        name: string;
        side: string;
        unit: string;
    };
    blitz: {
        name: string;
        side: string;
        unit: string;
    };
    buck: {
        name: string;
        side: string;
        unit: string;
    };
    capitao: {
        name: string;
        side: string;
        unit: string;
    };
    castle: {
        name: string;
        side: string;
        unit: string;
    };
    caveira: {
        name: string;
        side: string;
        unit: string;
    };
    doc: {
        name: string;
        side: string;
        unit: string;
    };
    echo: {
        name: string;
        side: string;
        unit: string;
    };
    ela: {
        name: string;
        side: string;
        unit: string;
    };
    frost: {
        name: string;
        side: string;
        unit: string;
    };
    fuze: {
        name: string;
        side: string;
        unit: string;
    };
    glaz: {
        name: string;
        side: string;
        unit: string;
    };
    hibana: {
        name: string;
        side: string;
        unit: string;
    };
    iq: {
        name: string;
        side: string;
        unit: string;
    };
    jackal: {
        name: string;
        side: string;
        unit: string;
    };
    jager: {
        name: string;
        side: string;
        unit: string;
    };
    kapkan: {
        name: string;
        side: string;
        unit: string;
    };
    lesion: {
        name: string;
        side: string;
        unit: string;
    };
    mira: {
        name: string;
        side: string;
        unit: string;
    };
    montagne: {
        name: string;
        side: string;
        unit: string;
    };
    mute: {
        name: string;
        side: string;
        unit: string;
    };
    pulse: {
        name: string;
        side: string;
        unit: string;
    };
    rook: {
        name: string;
        side: string;
        unit: string;
    };
    sledge: {
        name: string;
        side: string;
        unit: string;
    };
    smoke: {
        name: string;
        side: string;
        unit: string;
    };
    tachanka: {
        name: string;
        side: string;
        unit: string;
    };
    thatcher: {
        name: string;
        side: string;
        unit: string;
    };
    thermite: {
        name: string;
        side: string;
        unit: string;
    };
    twitch: {
        name: string;
        side: string;
        unit: string;
    };
    valkyrie: {
        name: string;
        side: string;
        unit: string;
    };
    ying: {
        name: string;
        side: string;
        unit: string;
    };
    dokkaebi: {
        name: string;
        side: string;
        unit: string;
    };
    vigil: {
        name: string;
        side: string;
        unit: string;
    };
    zofia: {
        name: string;
        side: string;
        unit: string;
    };
    lion: {
        name: string;
        side: string;
        unit: string;
    };
    finka: {
        name: string;
        side: string;
        unit: string;
    };
    alibi: {
        name: string;
        side: string;
        unit: string;
    };
    maestro: {
        name: string;
        side: string;
        unit: string;
    };
    recruitsas: {
        name: string;
        side: string;
        unit: string;
    };
    recruitfbi: {
        name: string;
        side: string;
        unit: string;
    };
    recruitgign: {
        name: string;
        side: string;
        unit: string;
    };
    recruitspetsnaz: {
        name: string;
        side: string;
        unit: string;
    };
    recruitgsg9: {
        name: string;
        side: string;
        unit: string;
    };
};
export declare const REGIONS: {
    emea: string;
    ncsa: string;
    apac: string;
};
export {};
