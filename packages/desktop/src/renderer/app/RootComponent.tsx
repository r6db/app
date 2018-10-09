import { IStore, ISettingsReducerState, IBackgroundReducerState } from '@r6db/interfaces';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { Spring, animated, Transition, config } from 'react-spring';
import { languages } from '../lib/constants';
import * as i18n from '../i18n';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import MatchesPage from './pages/Matches';
import FavoritesPage from './pages/Favorites';
import SettingsPage from './pages/Settings';
import RecentPage from './pages/Recent';

import Sidebar from '../components/Sidebar';

import './page.scss';

(window as any).i18n = i18n;
Object.keys(languages).forEach(ln => i18n.registerLocale(ln, languages[ln].messageFn));

const wrap = Component => style => (
    <animated.div key={1} className="page__contentwrap" style={style}>
        <Component />
    </animated.div>
);

const pageMap = {
    HOME: HomePage,
    LOGIN: LoginPage,
    MATCHES: MatchesPage,
    FAVORITES: FavoritesPage,
    RECENT: RecentPage,
    SETTINGS: SettingsPage,
    [NOT_FOUND]: HomePage,
};

function Fragment(props) {
    return props.children || <span {...props} /> || null;
}
interface IRootComponentProps {
    location: string;
    background: IBackgroundReducerState;
    settings: ISettingsReducerState;
}

class RootComponent extends React.PureComponent<IRootComponentProps, any> {
    constructor(props) {
        super(props);
        this.state = { error: null, settings: props.settings, messagesLoaded: false };
    }
    loadLocale(locale: string) {
        i18n.setCurrentLocale(locale)
            .then(() => this.setState({ messagesLoaded: true })) // just to trigger a redraw
            .catch(err => {
                console.warn('error getting locale', err);
            });
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ error: { error, info } });
        console.error(error, info);
    }

    componentWillMount() {
        this.loadLocale(this.state.settings.locale);
    }
    componentWillReceiveProps() {
        if (this.props.settings.locale !== this.state.settings.locale) {
            this.loadLocale(this.props.settings.locale);
        }
    }
    render() {
        if (this.state.error) {
            return (
                <div className="app">
                    <h1>An error occurred.</h1>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.info}
                </div>
            );
        }
        if (!this.state.messagesLoaded) {
            return <div className="app" />;
        }
        const bg = this.props.background;
        const Component = pageMap[this.props.location];
        return (
            <div className={`page ${this.props.location}`}>
                <svg
                    className="page__background"
                    viewBox={bg.image.viewBox}
                    preserveAspectRatio="xMidYMin slice"
                    style={{
                        background: bg.image.background,
                        filter: bg.filter,
                    }}
                >
                    {bg.image.polys.map(
                        (path, i) =>
                            this.props.settings.animations ? (
                                <Spring key={i} native to={path} config={bg.spring}>
                                    {(styles: any) => (
                                        <animated.path
                                            key={i}
                                            d={styles.d}
                                            fill={styles.fill}
                                            fillOpacity={styles.fillOpacity}
                                        />
                                    )}
                                </Spring>
                            ) : (
                                <path key={i} d={path.d} fill={path.fill} fillOpacity={path.fillOpacity} />
                            ),
                    )}
                </svg>
                <div className="page__navigation">
                    <Sidebar key={'route'} />
                </div>
                <div className="page__content">
                    {this.props.settings.animations ? (
                        <Transition
                            native
                            keys={this.props.location}
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ opacity: 0 }}
                            config={config.stiff}
                        >
                            {wrap(Component)}
                        </Transition>
                    ) : (
                        <Component />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IStore) {
    const { location, background, settings } = state;
    return {
        location: location.type,
        background,
        settings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: () => dispatch({ type: 'MENU_TOGGLE' }),
    };
}
const Comp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RootComponent);
export default hot(module)(Comp);
