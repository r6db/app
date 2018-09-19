/// <ref path="../declarations.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import RootComponent from './RootComponent';
import configureStore from './store';
import './app.scss';
import { IDomainState } from 'shared/interfaces';

async function setup() {
    const serverState: IDomainState = await fetch('/api/state').then(res => res.json());
    // build state to match the redux store
    const initialState = {
        auth: serverState.auth,
    };

    const history = createHistory();
    const store = configureStore(history, initialState);

    const mount = document.querySelector('.mount');
    const rerender = Component => render(Component, mount);

    class App extends React.PureComponent<{ store }> {
        render() {
            return (
                <Provider store={this.props.store}>
                    <RootComponent />
                </Provider>
            );
        }
    }

    // render our app
    function renderApp() {
        rerender(<App store={store} />);
    }
    renderApp();

    // Enable hot reloading if available
    if ((module as any).hot) {
        (module as any).hot.accept('./RootComponent', renderApp);
    }

    if (process.env.NODE_ENV === 'development') {
        (window as any).store = store;
    }
}

setup();
