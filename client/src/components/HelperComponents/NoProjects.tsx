import { Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../../static/styles';

const NoProjects = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.noProjects} data-testid="no-projects">
            <Typography variant="h5" color="textSecondary">
                No projects matching your search criteria have been found.
            </Typography>
        </div>
    );
};

export default NoProjects;
