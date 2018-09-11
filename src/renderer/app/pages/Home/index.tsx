import * as React from 'react';
import { IPageProps } from '../interfaces';
import JsonOut from './JsonOut';

export class HomePageComponent extends React.PureComponent<IPageProps> {
    render() {
        return <JsonOut {...this.props} />;
    }
}
