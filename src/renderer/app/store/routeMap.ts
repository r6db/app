import { redirect } from 'redux-first-router';
import { resetBackground, setBackground } from './actions/background';
import { clash, hereford } from 'renderer/assets/images';
import { IAuthReducerState } from 'renderer/app/store/reducers/authReducer';
import { IDomainState } from 'shared/interfaces';

const defaultSpring = { tension: 30, friction: 10 };

export default {
    HOME: {
        path: '/',
        thunk: async (dispatch, getState) => {
            const auth: IAuthReducerState = getState().auth;
            if (auth.authState !== 'authed') {
                console.log('not authed.. checking server');
                const serverState: IDomainState = await fetch('/api/state').then(res => res.json());
                if (serverState.auth.loginState === 'authed') {
                    console.log('got server auth');
                    dispatch({ type: 'LOGIN_SUCCESS' });
                } else {
                    console.log('not server auth');
                    dispatch(redirect({ type: 'LOGIN' }));
                }
            }
            dispatch(
                setBackground({
                    animate: true,
                    image: hereford,
                    filter: 'blur(2vw) contrast(0.5) brightness(0.5)',
                    spring: defaultSpring,
                }),
            );
        },
    },
    LOGIN: {
        path: '/login',
        thunk: dispatch => {
            dispatch(
                setBackground({
                    animate: true,
                    image: clash,
                    filter: 'blur(1vw)',
                    spring: { tension: 1, friction: 10 },
                }),
            );
        },
    },
    MATCHES: '/matches',
    FAVORITES: '/favorites',
    RECENT: '/recent',
    SETTINGS: '/settings',
};
