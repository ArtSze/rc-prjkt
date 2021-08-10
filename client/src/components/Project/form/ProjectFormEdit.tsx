import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../../../utils/axiosInstance';
import queryKeys from '../../../utils/queryKeys';
import ProjectForm from './form-subs/ProjectForm';
import { IProject, IProjectEdit } from '../../../types/types';
import { ProjectFormSubmitValues } from './ProjectFormAdd';

import { useStyles } from '../../../static/styles';
import { Container } from '@material-ui/core';

interface ProjectFormEditProps {
    projectToEdit: IProject;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const ProjectFormEdit = ({ projectToEdit, setOpen }: ProjectFormEditProps): JSX.Element => {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const editMutation = useMutation(
        (body: IProjectEdit) => axiosInstance.put(`/projects/${projectToEdit._id}`, body, { withCredentials: true }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(queryKeys.projects);
                queryClient.invalidateQueries(queryKeys.tags);
            },
        },
    );

    const submitEdittedProject = async (values: ProjectFormSubmitValues) => {
        editMutation.mutate({
            ...projectToEdit,
            title: values.title,
            description: values.description,
            githubLink: values.githubLink,
            collaborators: values.collaborators,
            tags: values.tags,
            active: values.active,
        });

        // maybe incorporate visual feedback for successful submission?
        setOpen((prevState: boolean) => !prevState);
    };

    const onCancel = () => {
        setOpen((prevState: boolean) => !prevState);
    };

    const initialValues: ProjectFormSubmitValues = {
        title: projectToEdit.title || '',
        description: projectToEdit.description || '',
        githubLink: projectToEdit.githubLink || '',
        collaborators: projectToEdit.collaborators || [],
        tags: projectToEdit.tags || [],
        active: projectToEdit.active || true,
    };

    return (
        <div>
            <Container disableGutters className={classes.projectFormContainer}>
                <ProjectForm onSubmit={submitEdittedProject} initialValues={initialValues} onCancel={onCancel} />
            </Container>
        </div>
    );
};

export default ProjectFormEdit;
