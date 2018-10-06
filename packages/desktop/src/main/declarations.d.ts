declare module 'electron-store';
declare module 'debug' {
    type debugLog = (formatter: any, ...args: any[]) => void;
    function makeFormatter(namespace: string): debugLog;
    export default makeFormatter;
}
