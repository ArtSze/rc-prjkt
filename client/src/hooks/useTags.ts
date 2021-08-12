import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { ITag } from '../types/types';
import queryKeys from '../utils/queryKeys';
import { AxiosError } from 'axios';

const getTags = async (): Promise<ITag[]> => {
    const defaultData: ITag[] = [];
    const { data = defaultData } = await axiosInstance.get('/tags');
    return data;
};

const useTags = (): UseQueryResult<ITag[], AxiosError> => {
    return useQuery(queryKeys.tags, getTags) as UseQueryResult<ITag[], AxiosError>;
};

export function usePrefetchTags(): void {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery(queryKeys.tags, getTags);
}

export default useTags;
