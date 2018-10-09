import IntlMessageFormat from 'intl-messageformat';
import * as parser from 'intl-messageformat-parser';
import * as React from 'react';
import { produce } from 'immer';
import { zip, flatten } from 'lodash';

interface IMessageMap {
    [key: string]: string;
}
type LocaleImporter = () => Promise<{ default: IMessageMap }>;

const messages = new Map<string, any>();
const localeMap = new Map<string, LocaleImporter>();
let currentLocale: string | null = null;

export function registerLocale(locale: string, importFn: LocaleImporter) {
    if (localeMap.has(locale)) {
        console.warn('overwriting registered locale', locale, importFn);
    }
    console.debug('[i18n] registering locale', locale);
    localeMap.set(locale, importFn);
}

export async function setCurrentLocale(locale: string) {
    if (!localeMap.has(locale)) {
        throw new Error(`unknown locale: ${locale}`);
    }
    if (locale === currentLocale) {
        return;
    }
    currentLocale = locale;
    const importFn = localeMap.get(locale) as LocaleImporter;
    await importFn()
        .then(mod => mod.default)
        .then((messageMap: IMessageMap) => {
            const target = messages.get(locale) || {};
            Object.keys(messageMap).map(key => {
                target[key] = parser.parse(messageMap[key]);
            });
            console.debug('[i18n] loaded messages', { locale, message: target });
            messages.set(locale, target);
        });
}

export function t(key, context?: any) {
    if (!currentLocale) {
        console.error(`tried to translate before a locale was set`);
        return null;
    }
    const messageMap = messages.get(currentLocale) || {};
    const message = messageMap[key];
    if (!message) {
        console.error(`unknown message identifier: ${key} for locale ${currentLocale}`);
        return null;
    }
    return new IntlMessageFormat(message, currentLocale).format(context);
}
const Fragment = (React as any).Fragment;

interface IFormatProps {
    id: string;
    context?: any;
}
interface IFormatState {
    formatted: any;
}
export class Format extends React.PureComponent<IFormatProps, IFormatState> {
    constructor(props) {
        super(props);
        this.state = {
            formatted: null,
        };
    }

    componentDidMount() {
        this.update();
    }

    update() {
        const message = t(this.props.id, this.props.context);
        if (message) {
            const childComponents = ([] as any[]).concat(this.props.children).filter(x => typeof x !== 'string');
            const matches = message.match(/<\d+>(.*?<\/\d+>)?/g);
            const formatted = (matches || []).reduce(
                (acc, match) => {
                    const matchIndex = Number.parseInt(match.split('>')[0].substring(1), 10);
                    const matchedComponent = childComponents[matchIndex];
                    if (!matchedComponent) {
                        throw new Error(
                            `no component matching '${match}'. did you maybe miss adding children to the <Format /> call?`,
                        );
                    }
                    const children = match.replace(/<.*?>/g, '');
                    const replacement = children
                        ? React.cloneElement(matchedComponent, { key: match }, children)
                        : matchedComponent;
                    const firstPart = acc.slice(0, -1);
                    const secondPart = acc[acc.length - 1].split(match);
                    secondPart.splice(1, 0, replacement); // splice returns an array of deleted elements, not the initial one
                    return [...firstPart, ...secondPart];
                },
                [message],
            );

            this.setState(
                produce(this.state, draft => {
                    draft.formatted = formatted;
                }),
            );
        }
    }

    render() {
        return <Fragment>{this.state.formatted}</Fragment>;
    }
}
