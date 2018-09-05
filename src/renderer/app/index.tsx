/// <ref path="../declarations.d.ts" />
import { render } from 'inferno';
import * as api from 'renderer/lib/api';
import { onUpdate, getState } from 'renderer/lib/state';
import RouteSwitch from 'renderer/app/RouteSwitch';
import './app.scss';

const mount = document.querySelector('.mount');

// render our app
function renderApp() {
    if (mount) {
        render(<RouteSwitch {...getState()} api={api} />, mount);
    }
}

onUpdate(renderApp);

// Enable hot reloading if available
if ((module as any).hot) {
    (module as any).hot.accept('./RouteSwitch', renderApp);
}
