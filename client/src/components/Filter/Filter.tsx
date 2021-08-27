import React, { useEffect } from 'react';
import Sort from './Sort';
import { useStore, AppState } from '../../utils/store';
import { createParams } from '../../utils/paramParser';
import { QueryParams } from '../../types/filterTypes';
import { Divider, Grid } from '@material-ui/core';
import StatusFilter from './StatusFilter';
import OwnerFilter from './OwnerFilter';
import TagFilter from './TagFilter';
import { useImmer } from 'use-immer';
import { useStyles } from '../../static/styles';

export enum StatusChoices {
    'Active' = 'active',
    'Inactive' = 'inactive',
    'All' = 'all',
}

interface FilterProps {
    setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
}

const Filter = ({ setParams }: FilterProps): JSX.Element => {
    const classes = useStyles();
    const [statusFilter, setStatusFilter] = useImmer<StatusChoices>(StatusChoices['Active']);
    const tagFilter = useStore((state: AppState) => state.tagFilter);
    const ownerFilter = useStore((state: AppState) => state.ownerFilter);
    const sortFilter = useStore((state: AppState) => state.sortFilter);

    useEffect(() => {
        const params = createParams(statusFilter, tagFilter, ownerFilter, sortFilter);
        setParams(params);
    }, [statusFilter, tagFilter, ownerFilter, sortFilter]);

    return (
        <>
            <Grid data-testid="filter" className={classes.filter} container spacing={1}>
                <TagFilter />
                <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
                <OwnerFilter />
                <Sort />
            </Grid>
            <Divider variant="fullWidth" style={{ marginTop: '20px', marginBottom: '20px' }} />
        </>
    );
};

export default Filter;
