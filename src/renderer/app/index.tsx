/// <ref path="../declarations.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import * as api from 'renderer/lib/api';
import RootComponent from './RootComponent';
import configureStore from './store';
import './app.scss';

// TODO: use redux & routing instead of homebrew state

const history = createHistory();
const store = configureStore(history);

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
