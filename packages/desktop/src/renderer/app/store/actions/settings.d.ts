import { Action } from 'redux';
import { ISettingsReducerState } from '@r6db/interfaces';
export declare type SettingsActions = ISetSettingAction;
export interface ISetSettingAction extends Action {
    type: 'SETTING_SET';
    payload: Partial<ISettingsReducerState>;
}
export declare const setSetting: (opts: Partial<any>) => ISetSettingAction;
