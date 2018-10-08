import { Action } from 'redux';
import { IPolyImage } from '@r6db/interfaces';
export declare type BackgroundActions = IResetBackgroundAction | ISetBackgroundAction;
export interface IResetBackgroundAction extends Action {
    type: 'RESET_BACKGROUND';
}
export declare const resetBackground: () => IResetBackgroundAction;
export interface ISetBackgroundAction extends Action {
    type: 'SET_BACKGROUND';
    payload: {
        animate?: boolean;
        image?: IPolyImage;
        filter?: string;
        spring?: {
            tension: number;
            friction: number;
        };
    };
}
export declare const setBackground: (
    props: {
        animate?: boolean | undefined;
        image?: any;
        filter?: string | undefined;
        spring?:
            | {
                  tension: number;
                  friction: number;
              }
            | undefined;
    },
) => {
    type: string;
    payload: {
        animate?: boolean | undefined;
        image?: any;
        filter?: string | undefined;
        spring?:
            | {
                  tension: number;
                  friction: number;
              }
            | undefined;
    };
};
