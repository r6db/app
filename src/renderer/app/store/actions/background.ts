import { Action } from 'redux';
import { IPolyImage } from 'renderer/interfaces';

export type BackgroundActions = IResetBackgroundAction | ISetBackgroundAction;

export interface IResetBackgroundAction extends Action {
    type: 'RESET_BACKGROUND';
}
export const resetBackground = (): IResetBackgroundAction => ({ type: 'RESET_BACKGROUND' });

export interface ISetBackgroundAction extends Action {
    type: 'SET_BACKGROUND';
    payload: {
        animate?: boolean;
        image?: IPolyImage;
        filter?: string;
        spring?: { tension: number; friction: number };
    };
}
export const setBackground = (props: ISetBackgroundAction['payload']) => ({ type: 'SET_BACKGROUND', payload: props });
