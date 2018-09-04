/// <ref path="../declarations.d.ts" />
import { ipcRenderer } from 'electron';
import { render } from 'inferno';
import { applyPatches } from 'immer';
import JsonOut from './JsonOut';
import './app.scss';

const mount = document.querySelector('.mount');
let appstate = {};

// add listeners to update the state
ipcRenderer.addListener('state', (_, state) => {
    appstate = state;
    renderApp();
});
ipcRenderer.addListener('patch', (_, patches) => {
    appstate = applyPatches(appstate, patches);
    renderApp();
});

// render our app
function renderApp() {
    if (mount) {
        render(<JsonOut {...appstate} />, mount);
    }
}

// Enable hot reloading if available
if ((module as any).hot) {
    (module as any).hot.accept('./JsonOut', renderApp);
}
