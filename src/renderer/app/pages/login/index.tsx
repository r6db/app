import './login.scss';
import { Component } from 'inferno';
import { IDomainState } from 'shared/interfaces';
import { logIn } from 'renderer/lib/api';
import { UpdateDateColumn } from 'typeorm';

function FirstRunPopup() {
    return (
        <div className="dialog">
            <p>Welcome :)</p>
        </div>
    );
}

interface ILoginPageComponentState {
    email: string;
    password: string;
    rememberMail: boolean;
    rememberPass: boolean;
}
export class LoginPageComponent extends Component<IDomainState, ILoginPageComponentState> {
    constructor(props: IDomainState) {
        super(props);
        this.state = { ...props.auth };
    }
    public render() {
        if (!this.state) {
            return <div className="page login" />;
        }
        return (
            <div className="page login">
                {this.props.firstRun ? <FirstRunPopup /> : null}
                <div className="login__form">
                    <p className="login__component login__component--mail">
                        <label htmlFor="email">uplay email</label>
                        <input
                            id="email"
                            value={this.state.email}
                            type="text"
                            onInput={this.update('email').bind(this)}
                        />
                    </p>
                    <p className="login__component login__component--password">
                        <label htmlFor="email">password</label>
                        <input
                            id="email"
                            value={this.state.password}
                            onInput={this.update('password').bind(this)}
                            type="text"
                        />
                    </p>
                    <p className="login__component login__component--remembermail">
                        <label htmlFor="email">remember email</label>
                        <input
                            id="email"
                            checked={this.state.rememberMail}
                            onChange={this.update('rememberMail', 'checked').bind(this)}
                            type="checkbox"
                        />
                    </p>
                    <p className="login__component login__component--rememberpass">
                        <label htmlFor="email">rememberpassword</label>
                        <input
                            id="email"
                            checked={this.state.rememberPass}
                            onChange={this.update('rememberPass', 'checked').bind(this)}
                            type="checkbox"
                        />
                    </p>
                    <p>
                        <button className="login__submit" onclick={() => this.submit()}>
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        );
    }
    private update(stateProp: keyof ILoginPageComponentState, prop = 'value') {
        return e => {
            console.log(e.target[prop]);
            this.setState(state => ({
                ...state,
                [stateProp]: e.target[prop],
            }));
        };
    }
    private submit() {
        if (this.state) {
            console.log('logging in');
            logIn(this.state);
        } else {
            console.warn("can't login, no state");
        }
    }
}
