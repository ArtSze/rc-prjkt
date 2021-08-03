import React, { useState } from 'react';
import Filter, { QueryParams } from './filter/Filter';

import ProjectList from './ProjectList';
import useProjects from '../hooks/useProjects';
import Loading from './Loading';
import Auth from './Auth';
import Nav from './Nav';
import { SortMethods } from '../types';

import { useStyles } from '../static/styles';
import { Collapse, Snackbar } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

const Home = (): JSX.Element => {
    const [params, setParams] = useState<QueryParams>({ sort: SortMethods['Last Updated'] });
    const [allProjects, setAllProjects] = useState<boolean>(true);
    const [errorOpen, setErrorOpen] = useState<boolean>(false);

    const { data: projects, isLoading, isSuccess, error } = useProjects(params);
    const classes = useStyles();

    if (isLoading) return <></>;

    if (error && error.response?.status === 401) return <Auth />;
    // if (error && error.response?.status === 400) setErrorOpen(true);

    return (
        <div className={classes.root}>
            <Nav setParams={setParams} allProjects={allProjects} setAllProjects={setAllProjects} />
            <Collapse in={allProjects}>
                <Filter setParams={setParams} />
            </Collapse>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorOpen}>
                <Alert severity="error" onClose={() => setErrorOpen(false)}>
                    An unexpected error has occurred
                </Alert>
            </Snackbar>
            {isSuccess && projects ? <ProjectList projects={projects} /> : <Loading />}
        </div>
    );
};

export default Home;
