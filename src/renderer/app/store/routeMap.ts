import { redirect } from 'redux-first-router';

export default {
    HOME: {
        path: '/',
        thunk: (dispatch, getState) => {
            const s = getState();
            if (!s.user) {
                dispatch(redirect({ type: 'LOGIN' }));
            }
        },
    },
    LOGIN: '/login',
};
