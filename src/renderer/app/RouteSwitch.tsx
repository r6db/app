import { Component } from 'inferno';
import { IDomainState } from 'shared/interfaces';
import { getRoute } from 'renderer/app/routes';

import './pages';

export default function Layout(state: IDomainState) {
    const PageComponent = getRoute(state.routing.page, null);
    if (PageComponent) {
        return <PageComponent {...state} />;
    } else {
        return <div className="app">not found</div>;
    }
}
