declare const _default: (
    history: any,
    initialState: any,
) => import('redux').Store<
    {
        location: {};
        background: {
            animate: boolean;
            image: any;
            filter: string;
            spring:
                | {
                      tension: number;
                      friction: number;
                  }
                | {
                      tension: number;
                      friction: number;
                  };
        };
        auth: any;
        settings: any;
    },
    import('redux').AnyAction
>;
export default _default;
