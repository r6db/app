import { redirect } from 'redux-first-router';
import { resetBackground, setBackground } from './actions/background';
import { clash, hereford } from 'renderer/assets/images';

const defaultSpring = { tension: 30, friction: 10 };

export default {
    HOME: {
        path: '/',
        thunk: dispatch => {
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
