import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Select from 'react-select';
import { IOption } from '../../types/types';
import { useStore, AppState } from '../../utils/store';
import { Menu, SingleValue, SortControl } from '../HelperComponents/CustomSelectComponents';
import { SortMethods } from '../../types/types';

const Sort = (): JSX.Element => {
    const sortFilter = useStore((state: AppState) => state.sortFilter);
    const setSortFilter = useStore((state: AppState) => state.setSortFilter);

    const options: IOption<SortMethods>[] = [
        { value: SortMethods['Last Updated'], label: 'Last Updated' },
        { value: SortMethods['First Updated'], label: 'First Updated' },
        { value: SortMethods['Last Created'], label: 'Last Created' },
        { value: SortMethods['First Created'], label: 'First Created' },
        { value: SortMethods['Latest Batch'], label: 'Latest Batch' },
        { value: SortMethods['Oldest Batch'], label: 'Oldest Batch' },
    ];

    const getValue = () => {
        return options.filter((sort) => sortFilter?.includes(sort.value));
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">Sort</Typography>
            <Select
                options={options}
                components={{ Control: SortControl, Menu, SingleValue }}
                value={getValue()}
                onChange={(e) => {
                    if (e) setSortFilter(e.value);
                }}
            />
        </Grid>
    );
};

export default Sort;
