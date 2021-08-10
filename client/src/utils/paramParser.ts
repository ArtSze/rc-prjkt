import qs from 'qs';
import { StatusChoices } from '../components/Filter/Filter';
import { SortMethods } from '../types/filterTypes';
import { TTagFilter, TOwnerFilter, QueryParams } from '../types/filterTypes';

export function createParams(
    statusFilter: StatusChoices,
    tagFilter: TTagFilter,
    ownerFilter: TOwnerFilter,
    sortFilter: SortMethods,
): QueryParams {
    // parse UI state into format for axios params
    const params = {} as QueryParams;

    /**
     * if statusFilter is active, return active projects
     * if statusFilter is inactive, return inactive projects
     * if statusFilter is all, do not send as a query param and retrieve all projects
     */
    switch (statusFilter) {
        case 'active':
            params.status = true;
            break;
        case 'inactive':
            params.status = false;
            break;
        default:
            params.status = undefined;
    }

    if (tagFilter) {
        params.tags = tagFilter;
    }
    if (ownerFilter) {
        params.user = ownerFilter;
    }

    params.sort = sortFilter;
    return params;
}

export function paramsSerializer(params: string[]): string {
    // parse tag array into format acceptable for axios query params
    return qs.stringify(params, { arrayFormat: 'repeat' });
}
