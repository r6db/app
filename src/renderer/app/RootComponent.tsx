import { IDomainState } from 'shared/interfaces';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { IntlProvider } from 'react-intl';
import { languages } from 'renderer/lib/constants';

import { HomePageComponent } from './pages/Home';
import LoginPageComponent from './pages/Login';
import { Spring, animated } from 'react-spring';

import Sidebar from 'renderer/components/Sidebar';

import './page.scss';

const pageMap = {
    HOME: HomePageComponent,
    LOGIN: LoginPageComponent,
    [NOT_FOUND]: HomePageComponent,
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
                    {this.state.info.componentStack}
                </div>
            );
        }
        if (!this.state.messages) {
            return <div className="app" />;
        }
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
                        <this.props.Component key={'route'} />
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    const { locale, location, background } = state;
    return {
        location: location.type,
        Component: pageMap[location.type],
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
