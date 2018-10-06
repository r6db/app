declare const _default: (
    history: any,
    initialState: any,
) => import('redux').Store<
    {
        location: {};
        background: {
            animate: boolean;
            image: {
                background: string;
                viewBox: string;
                polys: {
                    fill: string;
                    fillOpacity: number;
                    d: string;
                }[];
            };
            filter: string;
            spring: {
                tension: number;
                friction: number;
            };
        };
        auth: import('@r6db/interfaces').IAuthReducerState;
        settings: import('@r6db/interfaces').ISettingsReducerState;
    },
    import('redux').AnyAction
>;
export default _default;
