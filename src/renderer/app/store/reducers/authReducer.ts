import produce from 'immer';
import { Action } from 'redux';
import { AuthActions } from '../actions/auth';
import { IAuthReducerState } from 'shared/interfaces';

const defaultState: IAuthReducerState = {
    email: '',
    password: '',
    remember: false,
    loginState: 'initial',
    error: null,
};

export default function authReducer(state: IAuthReducerState = defaultState, action: AuthActions): IAuthReducerState {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return produce(state, draft => {
                draft.loginState = 'pending';
                draft.email = action.payload.email;
                draft.password = action.payload.password;
                draft.remember = action.payload.remember;
            });
        case 'LOGIN_SUCCESS':
            return produce(state, draft => {
                draft.loginState = 'authed';
                draft.error = null;
            });
        case 'LOGIN_ERROR':
            return produce(state, draft => {
                draft.loginState = 'error';
                draft.error = action.payload;
            });
        default:
            return state;
    }
}
