import React from 'react';
import Select from 'react-select';
import { Grid, Typography } from '@material-ui/core';
import { IOption } from '../../types/types';
import { Menu, SingleValue } from '../HelperComponents/CustomSelectComponents';
import { useStore, AppState } from '../../utils/store';
import { StatusChoices } from '../../types/filterTypes';

const StatusFilter = (): JSX.Element => {
    const statusFilter = useStore((state: AppState) => state.statusFilter);
    const setStatusFilter = useStore((state: AppState) => state.setStatusFilter);
    const options: IOption<StatusChoices>[] = [
        { value: StatusChoices['Active'], label: 'Active' },
        { value: StatusChoices['Inactive'], label: 'Inactive' },
        { value: StatusChoices['All'], label: 'All' },
    ];

    const getValue = () => {
        switch (statusFilter) {
            case 'active':
                return options[0];
            case 'inactive':
                return options[1];
            case 'all':
                return options[2];
        }
    };

    return (
        <Grid data-testid="status-filter" item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">Status</Typography>
            <Select
                defaultValue={options[0]}
                components={{ Menu, SingleValue }}
                value={getValue()}
                options={options}
                name="status-filter"
                classNamePrefix="react-select-status-filter"
                onChange={(e) => {
                    setStatusFilter(e?.value as StatusChoices);
                }}
            />
        </Grid>
    );
};

export default StatusFilter;
