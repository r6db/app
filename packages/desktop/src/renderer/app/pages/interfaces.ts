import { IDomainState } from '@r6db/interfaces';
import * as api from 'renderer/lib/api';

export interface IPageProps extends IDomainState {
    api: typeof api;
}
