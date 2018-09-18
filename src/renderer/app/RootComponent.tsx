import { IDomainState } from 'shared/interfaces';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { Spring, animated, Transition, config } from 'react-spring';
import { IntlProvider } from 'react-intl';
import { languages } from 'renderer/lib/constants';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import MatchesPage from './pages/Matches';
import FavoritesPage from './pages/Favorites';
import SettingsPage from './pages/Settings';
import RecentPage from './pages/Recent';

import Sidebar from 'renderer/components/Sidebar';

import './page.scss';

const wrap = Component => style => (
    <animated.div key={1} className="page__contentwrap" style={style}>
        <Component />
    </animated.div>
);

const pageMap = {
    HOME: wrap(HomePage),
    LOGIN: wrap(LoginPage),
    MATCHES: wrap(MatchesPage),
    FAVORITES: wrap(FavoritesPage),
    RECENT: wrap(RecentPage),
    SETTINGS: wrap(SettingsPage),
    [NOT_FOUND]: wrap(HomePage),
};

function Fragment(props) {
    return props.children || <span {...props} /> || null;
}

class RootComponent extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = { error: null, locale: props.locale, messages: null };
    }
    loadLocale(locale: string) {
        console.log('attempting to load locale "%s"', locale);
        if (locale in languages) {
            languages[locale]
                .messageFn()
                .then(mod => {
                    this.setState({ messages: mod.default, locale });
                })
                .catch(err => {
                    console.warn('error getting locale', err);
                });
        } else {
            console.warn('locale not known: %s', locale);
        }
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ error: { error, info } });
        console.error(error, info);
    }

    componentWillMount() {
        this.loadLocale(this.state.locale);
    }
    componentWillReceiveProps() {
        if (this.props.locale !== this.state.locale) {
            this.loadLocale(this.props.locale);
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
        if (!this.state.messages) {
            return <div className="app" />;
        }
        console.log(this.props);
        const bg = this.props.background;
        return (
            <IntlProvider locale={this.props.locale} messages={this.state.messages} textComponent={Fragment}>
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
                                bg.animate ? (
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
                        <Transition
                            native
                            keys={this.props.location}
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ opacity: 0 }}
                            config={config.stiff}
                        >
                            {pageMap[this.props.location]}
                        </Transition>
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    const { locale, location, background } = state;
    console.log(location);
    return {
        location: location.type,
        locale,
        background,
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
