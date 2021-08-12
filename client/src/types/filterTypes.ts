import { ITag, IUser } from './types';

export enum SortMethods {
    'Last Updated' = 'last-updated',
    'First Updated' = 'first-updated',
    'Last Created' = 'last-created',
    'First Created' = 'first-created',
    'Latest Batch' = 'latest-batch',
    'Oldest Batch' = 'oldest-batch',
}

export type TTagFilter = ITag['value'][] | undefined;
export type TOwnerFilter = IUser['rcId'] | undefined;

export type QueryParams = {
    status?: boolean;
    tags?: TTagFilter;
    user?: TOwnerFilter;
    sort: SortMethods;
    me?: boolean;
};
