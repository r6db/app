import { Action } from 'redux';
import { ILoginOpts } from '@r6db/interfaces';
export declare type AuthActions =
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
export declare const login: (payload: ILoginOpts) => (dispatch: any) => Promise<void>;
interface ILogoutAction extends Action {
    type: 'LOGOUT';
}
export declare const logout: () => ILogoutAction;
export {};
