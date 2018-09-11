export default function localeReducer(state = 'en', action) {
    switch (action.type) {
        case 'SET_LOCALE':
            return action.payload;
        default:
            return state;
    }
}
