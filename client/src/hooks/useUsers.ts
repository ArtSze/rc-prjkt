import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { IUser } from '../types/types';
import queryKeys from '../utils/queryKeys';
import { AxiosError } from 'axios';

interface UserQueryParams {
    omitSelf: string;
}

const getUsers = async (params: UserQueryParams): Promise<IUser[]> => {
    const defaultData: IUser[] = [];
    const { data = defaultData } = await axiosInstance.get('/users/', { params });
    return data;
};

const useUsers = (params: UserQueryParams): UseQueryResult<IUser[], AxiosError> => {
    return useQuery([queryKeys.users, params], () => getUsers(params), { keepPreviousData: true });
};

export function usePrefetchUsers(params: UserQueryParams): void {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery(queryKeys.users, () => getUsers(params));
}

export default useUsers;
