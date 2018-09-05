import { ipcRenderer } from 'electron';
import { applyPatches } from 'immer';
import { IDomainState } from 'shared/interfaces';
let appstate: IDomainState;

const onUpdateListeners: Array<() => any> = [];

// add listeners to update the state
ipcRenderer.addListener('state', (_, state) => {
    appstate = state;
    console.trace('state', { state });
    notify();
});
ipcRenderer.addListener('patch', (_, patches) => {
    appstate = applyPatches(appstate, patches);
    console.trace('patch', patches, appstate);
    notify();
});

function notify() {
    onUpdateListeners.forEach(l => l());
}
export function onUpdate(listener: () => any) {
    onUpdateListeners.push(listener);
}
export function offUpdate(listener: () => any) {
    const index = onUpdateListeners.indexOf(listener);
    onUpdateListeners.splice(index, 1);
}

export function getState() {
    return appstate;
}

if (process.env.NODE_ENV !== 'production') {
    (window as any).getState = getState;
}
