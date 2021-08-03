import React from 'react';
import Select from 'react-select';
import useUsers from '../../hooks/useUsers';
import { IUser, IUserOptions, IOption } from '../../types';
import { useStore, AppState } from '../../utils/store';
import { Grid, Typography } from '@material-ui/core';
import { UserControl, Menu, Option, Placeholder, UserSingleValue } from '../select/SelectComponents';

const OwnerFilter = (): JSX.Element => {
    const setOwnerFilter = useStore((state: AppState) => state.setOwnerFilter);
    const ownerFilter = useStore((state: AppState) => state.ownerFilter);
    const { data: users, isSuccess } = useUsers({
        omitSelf: 'false',
    });

    const handleChange = (userOption: IOption<IUser>) => {
        userOption ? setOwnerFilter(userOption.value.rcId) : setOwnerFilter(undefined);
    };

    if (isSuccess && users) {
        const options: IUserOptions = users.map((user: IUser) => {
            return {
                value: user,
                label: `${user.first_name} ${user.last_name}`,
            };
        });

        const getValue = () => {
            const option = options.filter((u) => u.value.rcId === ownerFilter);
            return option.length > 0 ? option[0] : null;
        };

        return (
            <Grid item xs={12} sm={6} md={8}>
                <Typography variant="subtitle2">Owner Filter</Typography>
                <Select
                    value={getValue()}
                    components={{ Control: UserControl, Option, Menu, Placeholder, SingleValue: UserSingleValue }}
                    options={options}
                    name="user-filter"
                    onChange={(e) => handleChange(e as IOption<IUser>)}
                    placeholder="Select user..."
                    isClearable
                    isSearchable
                />
            </Grid>
        );
    }

    return (
        <Grid item xs={12} sm={12} md={8}>
            <Typography variant="subtitle2">Owner Filter</Typography>
            <Select
                components={{ Control: UserControl, Option, Menu, Placeholder, SingleValue: UserSingleValue }}
                name="user-filter"
                placeholder="Select user..."
                isClearable
                isSearchable
            />
        </Grid>
    );
};

export default OwnerFilter;
