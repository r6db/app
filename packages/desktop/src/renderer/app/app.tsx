import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import RootComponent from './RootComponent';

let store = null;

function App(props) {
    if (!store) {
        store = props.store;
    }
    return (
        <Provider store={store}>
            <RootComponent />
        </Provider>
    );
}

export default hot(module)(App);
