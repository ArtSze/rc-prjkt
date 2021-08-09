import { axiosInstance } from '../utils/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';

import { IProject } from '../types/types';
import constants from '../utils/constants';

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
            queryClient.invalidateQueries(constants.projects);
        },
    });
    return mutate;
};
