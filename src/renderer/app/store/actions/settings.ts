import { Action } from 'redux';
import { ISettingsReducerState } from 'shared/interfaces';

export type SettingsActions = ISetSettingAction;

export interface ISetSettingAction extends Action {
    type: 'SETTING_SET';
    payload: Partial<ISettingsReducerState>;
}
export const setSetting = (opts: Partial<ISettingsReducerState>): ISetSettingAction => ({
    type: 'SETTING_SET',
    payload: opts,
});
