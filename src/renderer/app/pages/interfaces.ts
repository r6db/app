import { IDomainState } from 'shared/interfaces';
import * as api from 'renderer/lib/api';

export interface IPageProps extends IDomainState {
    api: typeof api;
}
