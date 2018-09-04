/// <ref path="../declarations.d.ts" />
import { ipcRenderer } from 'electron';
import produce, { applyPatches } from 'immer';
console.log('app window');
import './app.scss';

const mount = document.querySelector('.mount');
let appstate = {};

ipcRenderer.addListener('state', (_, state) => {
    console.log('new state', state);
    appstate = state;
    render(appstate);
});
ipcRenderer.addListener('patch', (_, patches) => {
    console.log('new patch', patches);
    appstate = applyPatches(appstate, patches);
    render(appstate);
});
function render(state) {
    if (mount) {
        mount.innerHTML = `
        <pre>
            <code>
${JSON.stringify(state, null, 4)}
            </code>
        </pre>
        `;
    }
}
