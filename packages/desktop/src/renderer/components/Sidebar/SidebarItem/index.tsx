import * as React from 'react';
import { hot } from 'react-hot-loader';
import Icon from 'renderer/components/Icon';
import { NavLink } from 'redux-first-router-link';
import { Action } from 'redux';

interface ISidebarItemProps {
    glyph: SVGSymbolElement;
    tooltip?: string | JSX.Element;
    to?: string | Action;
}
class SidebarItem extends React.PureComponent<ISidebarItemProps, {}> {
    render() {
        return (
            <NavLink to={this.props.to} className="sidebar__item">
                <Icon className="sidebar__item--icon" glyph={this.props.glyph} />
                {this.props.tooltip ? <div className="sidebar__item--tooltip">{this.props.tooltip}</div> : null}
            </NavLink>
        );
    }
}

export default hot(module)(SidebarItem);
