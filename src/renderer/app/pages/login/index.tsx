import './login.scss';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'redux-first-router-link';
import Page from 'renderer/components/Page';
import Button from 'renderer/components/Button';
import { IPolyImage } from 'renderer/interfaces';
import { clash, maverick } from 'renderer/assets/images';
import { IPageProps } from 'renderer/app/pages/interfaces';

interface ILoginpageState {
    images: IPolyImage[];
    currentImage: number;
    firstRun: boolean;
    email: string;
    password: string;
    rememberMail: boolean;
    rememberPass: boolean;
}
export class LoginPageComponent extends React.Component<IPageProps, ILoginpageState> {
    interval: any;

    constructor(props) {
        super(props);
        this.state = {
            images: [clash, maverick],
            currentImage: 0,
            firstRun: true,
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
        const img = this.state.images[this.state.currentImage];
        return (
            <Page name="loginpage" background={img} backgroundFilter="blur(15px)">
                <div className="loginpage__info">
                    <div className="loginpage__infocontent">
                        <em>This is under active development. Things *will* break!</em>
                    </div>
                </div>
                <div className="loginpage__content">
                    <div className="loginpage__form">
                        <p className="loginpage__component loginpage__component--mail">
                            <label htmlFor="email">uplay email</label>
                            <input
                                id="email"
                                value={this.state.email}
                                type="text"
                                onChange={e => this.update('email', e.target.value)}
                            />
                        </p>
                        <p className="loginpage__component loginpage__component--password">
                            <label htmlFor="email">password</label>
                            <input
                                id="email"
                                value={this.state.password}
                                onChange={e => this.update('password', e.target.value)}
                                type="password"
                            />
                        </p>
                        <p className="loginpage__component loginpage__component--inline loginpage__component--remembermail">
                            <label htmlFor="email">remember email</label>
                            <input
                                id="email"
                                checked={this.state.rememberMail}
                                onChange={e => this.update('rememberMail', (e.target as any).checked)}
                                type="checkbox"
                            />
                        </p>
                        <p className="loginpage__component loginpage__component--inline loginpage__component--rememberpass">
                            <label htmlFor="email">remember password</label>
                            <input
                                id="email"
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
                        <p className="loginpage__component">
                            <Link to={{ type: 'HOME' }}>Home</Link>
                        </p>
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
            </Page>
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            console.log('changing image');
            this.setState(state => ({
                ...state,
                currentImage: (state.currentImage + 1) % state.images.length,
            }));
        }, 7000);
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
            this.props.api.logIn(this.state);
        } else {
            console.warn("can't login, no state");
        }
    }
}
