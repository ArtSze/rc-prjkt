import { axiosInstance } from '../utils/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';

import { IProject } from '../types/types';
import queryKeys from '../utils/queryKeys';

const deleteProjects = async (project: IProject) => {
    const { data } = await axiosInstance.delete(`projects/${project._id}`, {
        data: project,
        withCredentials: true,
    });
    return data;
};

export const useDeleteProjects = async (project: IProject) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(() => deleteProjects(project), {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.projects);
        },
    });
    return mutate;
};
