import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { IUser } from '../types';
import constants from '../utils/constants';
import { AxiosError } from 'axios';

interface UserQueryParams {
    omitSelf: string;
}

const getUsers = async (params: UserQueryParams): Promise<IUser[]> => {
    const defaultData: IUser[] = [];
    const { data = defaultData } = await axiosInstance.get('/users/', {
        params,
        withCredentials: true,
    });
    return data;
};

const useUsers = (params: UserQueryParams): UseQueryResult<IUser[], AxiosError> => {
    return useQuery([constants.users, params], () => getUsers(params), { keepPreviousData: true });
};

export function usePrefetchUsers(params: UserQueryParams): void {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery(constants.users, () => getUsers(params));
}

export default useUsers;
