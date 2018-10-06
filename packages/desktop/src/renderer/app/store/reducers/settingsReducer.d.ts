import { SettingsActions } from '../actions/settings';
import { ISettingsReducerState } from '@r6db/interfaces';
export default function settingsReducer(
    state: ISettingsReducerState | undefined,
    action: SettingsActions,
): ISettingsReducerState;
