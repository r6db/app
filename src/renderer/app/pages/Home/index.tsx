import * as React from 'react';
import Link from 'redux-first-router-link';
import JsonOut from './JsonOut';
import { hot } from 'react-hot-loader';

export class HomePage extends React.Component {
    render() {
        return (
            <div className="homepage">
                <Link to={{ type: 'LOGIN' }}>Login</Link>
                <JsonOut {...this.props} />
            </div>
        );
    }
}

export default hot(module)(HomePage);
