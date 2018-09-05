import { Component } from 'inferno';
import Layout from '../../Layout';
import JsonOut from './JsonOut';
import { IDomainState } from 'shared/interfaces';

export class HomePageComponent extends Component<IDomainState, IDomainState['auth']> {
    public render() {
        return (
            <Layout>
                <JsonOut {...this.props} />
            </Layout>
        );
    }
}
