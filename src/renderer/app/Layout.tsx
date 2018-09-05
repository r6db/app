import { ComponentType, VNode, Props } from 'inferno';
import { logOut } from 'renderer/lib/api';
interface ILayoutProps {
    topbar?: any;
    menu?: boolean;
    children?: any;
}
export default function Layout(props: ILayoutProps) {
    return (
        <div className={`app ${props.menu === false ? 'app--nomenu' : null}`}>
            {props.menu === false ? null : (
                <div className="app__menu">
                    <button onClick={logOut}>logout</button>
                </div>
            )}
            {props.topbar ? <div className="app__topbar">{props.topbar}</div> : null}
            <div className="app__content">{props.children}</div>
        </div>
    );
}
