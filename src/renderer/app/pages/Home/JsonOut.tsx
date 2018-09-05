export default function JsonOut(state) {
    const toLog = { ...state, auth: 'snip' };
    return (
        <div>
            <h1>Json Output</h1>
            <pre>
                <code>{JSON.stringify(toLog, null, 4)}</code>
            </pre>
        </div>
    );
}
