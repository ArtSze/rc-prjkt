import React from 'react';
import { ErrorMessage, Field } from 'formik';

import CustomMultiSelect, { IUserFromClient } from './generic/CustomMultiSelect';
import { IFormikLabelProps } from './generic/FormFields';

import useUsers from '../../../hooks/useUsers';
import Loading from '../../Loading';
import { useStyles } from '../../../static/styles';

import { Typography } from '@material-ui/core';

export const CollaboratorField = ({ label, field }: IFormikLabelProps): JSX.Element => {
    const params = {
        omitSelf: 'true',
    };
    const { data, isSuccess } = useUsers(params);
    const classes = useStyles();

    const convertToSelectionFormat = (arr: IUserFromClient[]) => {
        return arr.map((u) => {
            return {
                label: `${u.first_name} ${u.last_name}`,
                value: {
                    _id: u._id,
                    first_name: u.first_name,
                    last_name: u.last_name,
                    rcId: u.rcId,
                    image_path: u.image_path,
                },
            };
        });
    };

    if (isSuccess && data) {
        const collaborators = convertToSelectionFormat(data);
        const initSelections = convertToSelectionFormat(field.value);

        return (
            <div>
                <label htmlFor={field.name}>
                    <Typography className={classes.selectTitles}>{label}</Typography>
                </label>
                <Field
                    name={field.name}
                    value={field.value}
                    component={CustomMultiSelect}
                    options={collaborators}
                    initSelections={initSelections}
                />
                <ErrorMessage name={field.name} />
            </div>
        );
    }

    return <Loading />;
};
