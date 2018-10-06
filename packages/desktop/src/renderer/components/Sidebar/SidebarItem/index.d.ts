import * as React from 'react';
import { Action } from 'redux';
interface ISidebarItemProps {
    glyph: SVGSymbolElement;
    tooltip?: string | JSX.Element;
    to?: string | Action;
}
declare class SidebarItem extends React.PureComponent<ISidebarItemProps, {}> {
    render(): JSX.Element;
}
declare const _default: typeof SidebarItem;
export default _default;
