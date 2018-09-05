import { Component } from 'inferno';
import { IDomainState } from 'shared/interfaces';
import { getRoute } from 'renderer/app/routes';

import './pages';
import { IPageProps } from 'renderer/app/pages/interfaces';

export default function RouteSwitch(props: IPageProps) {
    const PageComponent = getRoute(props.routing.page, null);
    if (PageComponent) {
        return <PageComponent {...props} />;
    } else {
        return <div className="app">not found</div>;
    }
}
