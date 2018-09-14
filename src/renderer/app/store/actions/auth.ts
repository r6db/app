import { Action } from 'redux';
import { ILoginOpts } from 'shared/interfaces';

export type AuthActions = ILoginAction | ILogoutAction;

interface ILoginAction extends Action {
    type: 'LOGIN';
    payload: ILoginOpts;
}
export const login = (payload: ILoginOpts): ILoginAction => ({ type: 'LOGIN', payload });

interface ILogoutAction extends Action {
    type: 'LOGOUT';
}
export const logout = (): ILogoutAction => ({ type: 'LOGOUT' });
