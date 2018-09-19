import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { hot } from 'react-hot-loader';
import JsonOut from './JsonOut';

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

const mapState = state => state;

export default hot(module)(connect(mapState)(HomePage));
