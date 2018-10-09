import { IDomainState } from '@r6db/interfaces';
import * as api from '../../lib/api';

export interface IPageProps extends IDomainState {
    api: typeof api;
}
