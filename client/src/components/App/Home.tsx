import React, { useState } from 'react';
import Filter from '../Filter/Filter';
import { queryClient } from '../../utils/queryClient';
import { useQuery } from 'react-query';
import ProjectList from '../Project/ProjectList';
import useProjects from '../../hooks/useProjects';
import Loading from '../HelperComponents/Loading';
import Auth from './Auth';
import Nav from '../Nav/Nav';
import { SortMethods, QueryParams } from '../../types/filterTypes';
import { useStyles } from '../../static/styles';
import { Collapse, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import queryKeys from '../../utils/queryKeys';
import NavHome from '../Nav/NavHome';
import { useStore, AppState } from '../../utils/store';

const Home = (): JSX.Element => {
    const classes = useStyles();
    const [params, setParams] = useState<QueryParams>({ sort: SortMethods['Last Updated'] });
    const { data: projects, isLoading, isSuccess } = useProjects(params);
    const allProjects = useStore((state: AppState) => state.allProjects);

    const { data: auth } = useQuery(
        queryKeys.isAuth,
        () => Promise.resolve(queryClient.getQueryData(queryKeys.isAuth)),
        { initialData: true },
    );
    const { data: snackbarError } = useQuery(
        queryKeys.snackbarError,
        () => Promise.resolve(queryClient.getQueryData(queryKeys.snackbarError)),
        { initialData: false },
    );

    if (isLoading) return <></>;

    if (!auth) return <Auth />;

    return (
        <div className={classes.root}>
            <Nav appBarRight={<NavHome setParams={setParams} />} />
            <Collapse in={allProjects}>
                <Filter setParams={setParams} />
            </Collapse>
            <Snackbar
                data-testid="error-snackbar"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarError}
            >
                <Alert severity="error" onClose={() => queryClient.setQueryData(queryKeys.snackbarError, false)}>
                    An unexpected error has occurred
                </Alert>
            </Snackbar>
            {isSuccess && projects ? <ProjectList projects={projects} /> : <Loading />}
        </div>
    );
};

export default Home;
