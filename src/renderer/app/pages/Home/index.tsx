import * as React from 'react';
import Link from 'redux-first-router-link';
import Page from 'renderer/components/Page';
import { clash } from 'renderer/assets/images';
import JsonOut from './JsonOut';

export class HomePageComponent extends React.Component {
    render() {
        return (
            <Page name="homepage" backgroundFilter="blur(30px)" background={clash}>
                <p className="loginpage__component">
                    <Link to={{ type: 'LOGIN' }}>Login</Link>
                </p>
                <JsonOut {...this.props} />
            </Page>
        );
    }
}
