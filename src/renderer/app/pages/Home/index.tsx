import * as React from 'react';
import Link from 'redux-first-router-link';
import JsonOut from './JsonOut';

export class HomePageComponent extends React.Component {
    render() {
        return (
            <div className="homepage">
                <Link to={{ type: 'LOGIN' }}>Login</Link>
                <JsonOut {...this.props} />
            </div>
        );
    }
}
