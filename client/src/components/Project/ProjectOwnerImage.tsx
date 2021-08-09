import React from 'react';
import { IProject } from '../../types/types';
import { useStyles } from '../../static/styles';
import { Avatar } from '@material-ui/core';

const ProjectOwnerImage = ({ project }: { project: IProject }): JSX.Element => {
    const classes = useStyles();

    return (
        <Avatar
            className={classes.projectPhoto}
            variant="rounded"
            alt={project.owner.first_name + ' ' + project.owner.last_name}
            src={project.owner.image_path}
        ></Avatar>
    );
};

export default ProjectOwnerImage;
