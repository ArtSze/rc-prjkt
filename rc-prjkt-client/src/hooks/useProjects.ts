import { useQuery, UseQueryResult } from 'react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { IProjectOwnerCheck } from '../types';
import constants from '../utils/constants';
import { paramsSerializer } from '../utils/paramParser';
import { QueryParams } from '../components/filter/Filter';
import { AxiosError } from 'axios';

const getProjects = async (params: QueryParams): Promise<IProjectOwnerCheck[]> => {
    const defaultData: IProjectOwnerCheck[] = [];
    const { data = defaultData } = await axiosInstance.get('/projects/', {
        params,
        paramsSerializer,
        withCredentials: true,
    });
    return data;
};
const useProjects = (params: QueryParams): UseQueryResult<IProjectOwnerCheck[], AxiosError> => {
    return useQuery([constants.projects, params], () => getProjects(params), { keepPreviousData: true });
};

export default useProjects;
