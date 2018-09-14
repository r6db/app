import { IDomainState } from 'shared/interfaces';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { IntlProvider } from 'react-intl';
import { languages } from 'renderer/lib/constants';

import { HomePageComponent } from './pages/Home';
import { LoginPageComponent } from './pages/Login';

import hereford from 'renderer/assets/primitives/hereford.svg';

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
            // You can render any custom fallback UI
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
        return (
            <IntlProvider locale={this.props.locale} messages={this.state.messages} textComponent={Fragment}>
                <div className={'app ' + this.props.location}>
                    <this.props.Component key={'route'} />
                </div>
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    const { locale, location, loading } = state;
    return {
        location: location.type,
        Component: pageMap[location.type],
        loading,
        locale,
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
