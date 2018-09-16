import * as React from 'react';
import { hot } from 'react-hot-loader';
import Icon from 'renderer/components/Icon';
import Link from 'redux-first-router-link';

interface ISidebarItemProps {
    glyph: SVGSymbolElement;
    tooltip?: string | JSX.Element;
}
class SidebarItem extends React.PureComponent<ISidebarItemProps, {}> {
    render() {
        return (
            <Link className="sidebar__item">
                <Icon className="sidebar__item--icon" glyph={this.props.glyph} />
                {this.props.tooltip ? <div className="sidebar__item--tooltip">{this.props.tooltip}</div> : null}
            </Link>
        );
    }
}

export default hot(module)(SidebarItem);
