declare const _default: {
    HOME: {
        path: string;
        thunk: (dispatch: any, _: any) => Promise<void>;
    };
    LOGIN: {
        path: string;
        thunk: (dispatch: any) => void;
    };
    MATCHES: string;
    FAVORITES: string;
    RECENT: string;
    SETTINGS: string;
};
export default _default;
