import * as React from 'react';
import { hot } from 'react-hot-loader';
import './sidebar.scss';

import EXAMPLE from 'renderer/assets/avatar.png';

import MATCHES from 'feather-icons/dist/icons/list.svg';
import FAVORITES from 'feather-icons/dist/icons/star.svg';
import RECENTPLAYERS from 'feather-icons/dist/icons/clock.svg';
import SETTINGS from 'feather-icons/dist/icons/settings.svg';

import SidebarItem from 'renderer/components/Sidebar/SidebarItem';

class Sidebar extends React.PureComponent<any, any> {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__avatar">
                    <img className="sidebar__avatar--image" src={EXAMPLE} />
                    <div className="sidebar__avatar--dot" />
                    <div className="sidebar__avatar--tooltip">marcopixel</div>
                </div>
                <div className="sidebar__divider" />
                <div className="sidebar__items">
                    <SidebarItem to="/matches" glyph={MATCHES} tooltip="Matches" />
                    <SidebarItem to="/favorites" glyph={FAVORITES} tooltip="Favorites" />
                    <SidebarItem to="/recent" glyph={RECENTPLAYERS} tooltip="Recent Players" />
                    <div className="sidebar__items--bottom">
                        <SidebarItem to="/settings" glyph={SETTINGS} tooltip="Settings" />
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(Sidebar);
