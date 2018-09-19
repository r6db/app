import * as React from 'react';

export default function JsonOut(state) {
    return (
        <div>
            <h1>Json Output</h1>
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </div>
    );
}
