import { Action } from 'redux';
import { logIn } from 'renderer/lib/api';
import { ILoginOpts } from 'shared/interfaces';

export type AuthActions =
    | ILoginPendingAction
    | ILogoutAction
    | ILoginPendingAction
    | ILoginSuccessAction
    | ILoginErrorAction;

interface ILoginPendingAction extends Action {
    type: 'LOGIN_PENDING';
    payload: ILoginOpts;
}
interface ILoginSuccessAction extends Action {
    type: 'LOGIN_SUCCESS';
}

interface ILoginErrorAction extends Action {
    type: 'LOGIN_ERROR';
    payload: string;
}
export const login = (payload: ILoginOpts) => async dispatch => {
    dispatch({ type: 'LOGIN_PENDING', payload });
    logIn(payload)
        .then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
            dispatch({ type: 'HOME' });
        })
        .catch(err => dispatch({ type: 'LOGIN_ERROR', payload: err }));
};

interface ILogoutAction extends Action {
    type: 'LOGOUT';
}
export const logout = (): ILogoutAction => ({ type: 'LOGOUT' });
