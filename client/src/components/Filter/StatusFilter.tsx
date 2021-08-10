import React from 'react';
import { StatusChoices } from './Filter';
import { Updater } from 'use-immer';
import Select from 'react-select';
import { Grid, Typography } from '@material-ui/core';
import { IOption } from '../../types/types';
import { Menu, SingleValue } from '../HelperComponents/CustomSelectComponents';

interface StatusFilterProps {
    statusFilter: StatusChoices;
    setStatusFilter: Updater<StatusChoices>;
}

const StatusFilter = ({ setStatusFilter }: StatusFilterProps): JSX.Element => {
    const options: IOption<StatusChoices>[] = [
        { value: StatusChoices['Active'], label: 'Active' },
        { value: StatusChoices['Inactive'], label: 'Inactive' },
        { value: StatusChoices['All'], label: 'All' },
    ];

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">Status</Typography>
            <Select
                defaultValue={options[0]}
                components={{ Menu, SingleValue }}
                options={options}
                name="status-filter"
                onChange={(e) => {
                    console.log(e?.value);
                    setStatusFilter(e?.value as StatusChoices);
                }}
            />
        </Grid>
    );
};

export default StatusFilter;
