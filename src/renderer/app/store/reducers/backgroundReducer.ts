import produce from 'immer';
import { IBackgroundReducerState } from 'shared/interfaces';
import { hereford } from 'renderer/assets/images';
import { BackgroundActions } from '../actions/background';

const defaultState = {
    animate: true,
    image: hereford,
    filter: 'blur(30px)',
    spring: { tension: 4, friction: 10 },
};

export default function backgroundReducer(state = defaultState, action: BackgroundActions) {
    switch (action.type) {
        case 'RESET_BACKGROUND':
            return defaultState;
        case 'SET_BACKGROUND':
            return { ...defaultState, ...action.payload };
        default:
            return state;
    }
}
