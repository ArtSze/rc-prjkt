import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { IProjectOwnerCheck } from '../types/types';
import queryKeys from '../utils/queryKeys';
import { QueryParams } from '../components/Filter/Filter';
import { AxiosError } from 'axios';

const getProjects = async (params: QueryParams): Promise<IProjectOwnerCheck[]> => {
    const defaultData: IProjectOwnerCheck[] = [];
    const { data = defaultData } = await axiosInstance.get('/projects/', { params });
    return data;
};
const useProjects = (params: QueryParams): UseQueryResult<IProjectOwnerCheck[], AxiosError> => {
    return useQuery([queryKeys.projects, params], () => getProjects(params), { keepPreviousData: true });
};

export default useProjects;
