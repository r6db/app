/// <ref path="../declarations.d.ts" />
console.log('app window');
import { parse } from 'querystring';
import './app.scss';

const query = parse(window.location.search.substring(1));

const mount = document.querySelector('.mount');
if (mount) {
    mount.innerHTML = `
<pre>
<code>
${JSON.stringify(query, null, 4)}
</code>
</pre>
`;
}
