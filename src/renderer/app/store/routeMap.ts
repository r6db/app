import { redirect } from 'redux-first-router';
import { resetBackground, setBackground } from './actions/background';
import { clash, hereford } from 'renderer/assets/images';
import { IDomainState, IAuthReducerState } from 'shared/interfaces';

const defaultSpring = { tension: 10, friction: 10 };

export default {
    HOME: {
        path: '/',
        thunk: async (dispatch, _) => {
            // const auth: IAuthReducerState = getState().auth;
            // if (auth.loginState !== 'authed') {
            //     console.log('not authed.. checking server');
            //     const serverState: IDomainState = await fetch('/api/state').then(res => res.json());
            //     if (serverState.auth.loginState === 'authed') {
            //         console.log('got server auth');
            //         dispatch({ type: 'LOGIN_SUCCESS' });
            //     } else {
            //         console.log('not server auth');
            //         dispatch(redirect({ type: 'LOGIN' }));
            //     }
            // }
            dispatch(
                setBackground({
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
                    image: clash,
                    filter: 'blur(1vw)',
                }),
            );
        },
    },
    MATCHES: '/matches',
    FAVORITES: '/favorites',
    RECENT: '/recent',
    SETTINGS: '/settings',
};
