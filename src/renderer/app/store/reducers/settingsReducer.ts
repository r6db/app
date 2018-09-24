import produce from 'immer';
import { Action } from 'redux';
import { SettingsActions } from '../actions/settings';
import { ISettingsReducerState } from 'shared/interfaces';

const defaultState: ISettingsReducerState = {
    animations: true,
};

export default function settingsReducer(
    state: ISettingsReducerState = defaultState,
    action: SettingsActions,
): ISettingsReducerState {
    switch (action.type) {
        case 'SETTING_SET':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
