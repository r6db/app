/// <ref path="../declarations.d.ts" />
import JsonOut from './JsonOut';
import Layout from './Layout';
import { render } from 'inferno';
import { onUpdate, getState } from '../lib/state';
import './app.scss';

const mount = document.querySelector('.mount');

// render our app
function renderApp() {
    if (mount) {
        render(<Layout {...getState()} />, mount);
    }
}

onUpdate(renderApp);

// Enable hot reloading if available
if ((module as any).hot) {
    (module as any).hot.accept('./JsonOut', renderApp);
}
