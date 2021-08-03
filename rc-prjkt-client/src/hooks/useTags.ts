import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { ITag } from '../types';
import constants from '../utils/constants';
import { AxiosError } from 'axios';

const getTags = async (): Promise<ITag[]> => {
    const defaultData: ITag[] = [];
    const { data = defaultData } = await axiosInstance.get('/tags/', { withCredentials: true });
    return data;
};

const useTags = (): UseQueryResult<ITag[], AxiosError> => {
    return useQuery(constants.tags, getTags) as UseQueryResult<ITag[], AxiosError>;
};

export function usePrefetchTags(): void {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery(constants.tags, getTags);
}

export default useTags;
