import { Component } from 'inferno';
import { IDomainState } from 'shared/interfaces';
import { LoginPageComponent } from './pages/login';

interface IRouteMap {
    [route: string]: Component<IDomainState, any>;
}
const routeMap = {
    login: LoginPageComponent,
};

export default function Layout(state: IDomainState) {
    const Page = routeMap[state.routing.page];
    if (Page) {
        return (
            <div className="app">
                <div className="app__page">
                    <Page {...state} />
                </div>
            </div>
        );
    } else {
        return <div className="app">not found</div>;
    }
}
