import { Component } from 'inferno';
import { IDomainState } from 'shared/interfaces';
import { HomePageComponent } from 'renderer/app/pages/Home';

export function Page(route: IDomainState['routing']['page']) {
    return function target(PageComponent: any) {
        routes[route] = PageComponent;
        console.debug('registering page', route);
        return PageComponent;
    };
}

const routes = {};

export function getRoute(route: string, defaultValue: any) {
    return routes[route] || defaultValue;
}
