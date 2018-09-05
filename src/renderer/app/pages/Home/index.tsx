import { Component } from 'inferno';
import Layout from '../../Layout';
import { Page } from 'renderer/app/routes';
import JsonOut from './JsonOut';
import { IDomainState } from 'shared/interfaces';

@Page('home')
export class HomePageComponent extends Component<IDomainState> {
    render() {
        return (
            <Layout>
                <JsonOut {...this.props} />
            </Layout>
        );
    }
}
