import produce from 'immer';
import { ILocaleReducerState } from 'shared/interfaces';

const defaultState = {
    selectedLocale: 'en',
};

export default function localeReducer(state: ILocaleReducerState = defaultState, action) {
    switch (action.type) {
        case 'SET_LOCALE':
            return produce(state, draft => {
                draft.selectedLocale = action.payload;
            });
        default:
            return state;
    }
}
