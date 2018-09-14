import * as React from 'react';
import Link from 'redux-first-router-link';
import Page from 'renderer/components/Page';
import JsonOut from './JsonOut';

export class HomePageComponent extends React.Component {
    render() {
        return (
            <Page noAnimate name="homepage" backgroundFilter="blur(20px) contrast(0.5) brightness(0.5)">
                <p className="loginpage__component">
                    <Link to={{ type: 'LOGIN' }}>Login</Link>
                </p>
                <JsonOut {...this.props} />
            </Page>
        );
    }
}
