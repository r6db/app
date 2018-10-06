import { AuthActions } from '../actions/auth';
import { IAuthReducerState } from '@r6db/interfaces';
export default function authReducer(state: IAuthReducerState | undefined, action: AuthActions): IAuthReducerState;
