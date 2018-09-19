import produce from 'immer';
import { Action } from 'redux';
import { AuthActions } from '../actions/auth';

export interface IAuthReducerState {
    authState: 'initial' | 'pending' | 'authed' | 'error';
    error: string | null;
}

const defaultState = {
    authState: 'initial',
    error: null,
};

export default function backgroundReducer(state = defaultState, action: AuthActions) {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return produce(state, draft => ({ ...draft, authState: 'pending' }));
        case 'LOGIN_SUCCESS':
            return { authState: 'authed', error: null };
        case 'LOGIN_ERROR':
            return { authState: 'error', error: action.payload };
        default:
            return state;
    }
}
