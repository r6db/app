import { Component } from 'inferno';
import Layout from 'renderer/app/Layout';
import { Page } from 'renderer/app/routes';
import { IPageProps } from '../interfaces';
import JsonOut from './JsonOut';

@Page('home')
export class HomePageComponent extends Component<IPageProps> {
    render() {
        return (
            <Layout>
                <JsonOut {...this.props} />
            </Layout>
        );
    }
}
