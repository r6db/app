import './login.scss';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'redux-first-router-link';
import Icon from 'renderer/components/Icon';
import Button from 'renderer/components/Button';
import { IPolyImage } from 'renderer/interfaces';
import { maverick } from 'renderer/assets/images';
import { connect } from 'react-redux';
import { IPageProps } from 'renderer/app/pages/interfaces';
import { setBackground, ISetBackgroundAction } from 'renderer/app/store/actions/background';
import { login, logout } from 'renderer/app/store/actions/auth';
import { ILoginOpts } from 'shared/interfaces';

import LOGO from 'renderer/assets/logo.svg';
import MAIL from 'feather-icons/dist/icons/mail.svg';
import LOCK from 'feather-icons/dist/icons/lock.svg';

interface ILoginpageProps {
    setBackground(props: ISetBackgroundAction['payload']): any;
    logIn(opts: ILoginOpts): any;
    logOut(): any;
}
interface ILoginpageState {
    firstRun: boolean;
    email: string;
    password: string;
    rememberMail: boolean;
    rememberPass: boolean;
}
class LoginPageComponent extends React.Component<ILoginpageProps, ILoginpageState> {
    constructor(props) {
        super(props);
        this.state = {
            firstRun: false,
            email: '',
            password: '',
            rememberMail: false,
            rememberPass: false,
        };
    }
    render() {
        if (!this.state) {
            return <div className="loginpage" />;
        }
        return (
            <div className="loginpage">
                <div className="loginpage__content">
                    <div className="loginpage__form">
                        <Icon className="loginpage__logo" glyph={LOGO} />
                        <div className="loginpage__welcome">
                            <div className="loginpage__welcome--header">Let's get started!</div>
                            <span>Please enter your Ubisoft credientials down below.</span>
                        </div>
                        <p className="loginpage__component loginpage__textbox loginpage__component--mail">
                            <input
                                id="email"
                                value={this.state.email}
                                type="text"
                                onChange={e => this.update('email', e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <Icon className="loginpage__textbox--icon" glyph={MAIL} />
                        </p>
                        <p className="loginpage__component loginpage__textbox loginpage__component--password">
                            <input
                                id="email"
                                value={this.state.password}
                                onChange={e => this.update('password', e.target.value)}
                                type="password"
                                placeholder="Password"
                                required
                            />
                            <Icon className="loginpage__textbox--icon" glyph={LOCK} />
                        </p>
                        <p className="loginpage__component loginpage__component--inline loginpage__component--rememberpass">
                            <label htmlFor="rememberPass">Remember Me</label>
                            <input
                                id="rememberPass"
                                checked={this.state.rememberPass}
                                onChange={e => this.update('rememberPass', (e.target as any).checked)}
                                type="checkbox"
                            />
                        </p>
                        <p className="loginpage__component">
                            <Button
                                className="loginpage__submit"
                                onClick={() => this.submit()}
                                role="primary"
                                label={<FormattedMessage id="login" />}
                            />
                        </p>
                        <p className="loginpage__component loginpage__component--links">
                            <a href="#" onClick={() => this.openPopup()}>
                                Why do you need my login data?
                            </a>
                        </p>
                    </div>
                </div>
                <div className="loginpage__info">
                    <div className="loginpage__infocontent">
                        <em>This is under active development. Things *will* break!</em>
                        <Link to={{ type: 'HOME' }}>Home</Link>
                    </div>
                </div>
                {this.state.firstRun ? (
                    <div className="loginpage__popup">
                        <header>This is important:</header> <br />
                        <p>
                            To use this app, we require you to enter your Uplay/Ubisoft credentials. The reason for this
                            is that we can not get any data without authenticating against Ubisofts API. We use the
                            credentials <em>exclusively</em> for this reason.
                            <br />
                            You can inspect what we do with this data in our{' '}
                            <a href="https://github.com/r6db/app" target="_BLANK">
                                Codebase
                            </a>
                            , as we're open-source.
                        </p>
                        <p>
                            If you don't feel comfortable with this, you can create a fresh uplay account and enter
                            those credentials instead. <br />
                            Either way, we <em>strongly</em> suggest that you enable 2-factor-authentication for all of
                            your accounts.
                        </p>
                        <Button role="info" label="OK" onClick={() => this.closePopup()} />
                    </div>
                ) : (
                    false
                )}
            </div>
        );
    }

    private openPopup() {
        this.setState({
            firstRun: true,
        });
    }

    private closePopup() {
        this.setState({
            firstRun: false,
        });
    }
    private update(stateProp: keyof IPageProps['auth'], value) {
        this.setState(state => ({
            ...state,
            [stateProp]: value,
        }));
    }
    private submit() {
        if (this.state) {
            this.props.logIn(this.state);
        } else {
            console.warn("can't login, no state");
        }
    }
}

function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch, _) {
    return {
        setBackground(config) {
            dispatch(setBackground(config));
        },
        logIn(opts: ILoginOpts) {
            dispatch(login(opts));
        },
        logOut() {
            dispatch(logout());
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPageComponent);
