import { ipcRenderer } from 'electron';
import { ILoginOpts } from 'shared/interfaces';

export function logIn(opts: ILoginOpts) {
    ipcRenderer.send('app_login', opts);
}

export function logOut() {
    ipcRenderer.send('app_logout');
}
