/**
 * placeholder
 * maybe a floating loading page? dunno. this is just for testing seperate 'windows' right now
 */
import { ipcRenderer } from 'electron';
import './loading.scss';
console.log('loading window');

const el = document.querySelector('span');
ipcRenderer.addListener('loading_status', (e, message) => {
    console.log(e);
    if (el) {
        el.innerText = message;
    }
});
