import { Component } from 'inferno';
import { LoginPageComponent } from './pages/Login';
import { HomePageComponent } from './pages/Home';
import { IDomainState } from 'shared/interfaces';

interface IRouteMap {
    [route: string]: Component<IDomainState, any>;
}
const routeMap = {
    login: LoginPageComponent,
    home: HomePageComponent,
};

export default function Layout(state: IDomainState) {
    const Page = routeMap[state.routing.page];
    if (Page) {
        return <Page {...state} />;
    } else {
        return <div className="app">not found</div>;
    }
}
