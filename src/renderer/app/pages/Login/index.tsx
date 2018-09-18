import './login.scss';
import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
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
import ALERT from 'renderer/assets/icons/alert.svg';
import MAIL from 'feather-icons/dist/icons/mail.svg';
import LOCK from 'feather-icons/dist/icons/lock.svg';
import { hot } from 'react-hot-loader';

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
class LoginPage extends React.Component<ILoginpageProps, ILoginpageState> {
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
                            <div className="loginpage__welcome--header">
                                <FormattedMessage id="login/letsgetstarted" />
                            </div>
                            <span>
                                <FormattedMessage id="login/entercredentials" />
                            </span>
                        </div>
                        <p className="loginpage__component loginpage__textbox loginpage__component--mail">
                            <FormattedMessage id="email">
                                {x => (
                                    <input
                                        id="email"
                                        value={this.state.email}
                                        type="text"
                                        onChange={e => this.update('email', e.target.value)}
                                        placeholder={x}
                                        required
                                    />
                                )}
                            </FormattedMessage>
                            <Icon className="loginpage__textbox--icon" glyph={MAIL} />
                        </p>
                        <p className="loginpage__component loginpage__textbox loginpage__component--password">
                            <FormattedMessage id="password">
                                {x => (
                                    <input
                                        id="email"
                                        value={this.state.password}
                                        onChange={e => this.update('password', e.target.value)}
                                        type="password"
                                        placeholder={x}
                                        required
                                    />
                                )}
                            </FormattedMessage>
                            <Icon className="loginpage__textbox--icon" glyph={LOCK} />
                        </p>
                        <p className="loginpage__component loginpage__component--inline loginpage__component--rememberpass">
                            <label htmlFor="rememberPass">
                                <FormattedMessage id="rememberMe" />
                            </label>
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
                                <FormattedMessage id="login/whydoyouneed" />
                            </a>
                        </p>
                    </div>
                </div>
                <div className="loginpage__info">
                    <div className="loginpage__infocontent">
                        <em>This is under active development. Things *will* break!</em>{' '}
                        <Link to={{ type: 'HOME' }}>Home</Link>
                    </div>
                </div>
                {this.state.firstRun ? (
                    <div className="loginpage__popup">
                        <header>
                            <Icon glyph={ALERT} />
                            <FormattedMessage id="thisisimportant" />
                        </header>
                        <p>
                            <FormattedHTMLMessage id="login/popup/paragraph1" />
                        </p>
                        <p>
                            <FormattedHTMLMessage id="login/popup/paragraph2" />
                            <FormattedMessage
                                id="login/popup/paragraph2link"
                                values={{
                                    codeBase: <a href="https://github.com/r6db/app">Codebase</a>,
                                }}
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                id="login/popup/paragraph3"
                                values={{
                                    ubiAccount: <a href="https://account.ubisoft.com">create a new Ubisoft account</a>,
                                }}
                            />
                        </p>
                        <p>
                            <FormattedHTMLMessage id="login/popup/paragraph4" />
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
export default hot(module)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(LoginPage),
);
