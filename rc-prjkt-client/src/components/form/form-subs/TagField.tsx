import React from 'react';
import { ErrorMessage, Field } from 'formik';

import CustomCreatableMultiSelect, { ITagFromClient } from './generic/CustomCreatableMultiSelect';
import { IFormikLabelProps } from './generic/FormFields';

import useTags from '../../../hooks/useTags';
import Loading from '../../Loading';
import { useStyles } from '../../../static/styles';

import { Typography } from '@material-ui/core';

export const TagField = ({ label, field }: IFormikLabelProps): JSX.Element => {
    const { data, isSuccess } = useTags();
    const classes = useStyles();

    const convertToSelectionFormat = (arr: ITagFromClient[]) => {
        return arr.map((t) => {
            return {
                label: `${t.value}`,
                value: {
                    _id: `${t._id}`,
                    value: `${t.value}`,
                },
            };
        });
    };

    if (isSuccess && data) {
        const tags = convertToSelectionFormat(data);
        const initSelections = convertToSelectionFormat(field.value);

        return (
            <div>
                <label htmlFor={field.name}>
                    <Typography className={classes.selectTitles}>{label}</Typography>
                </label>
                <Field
                    name={field.name}
                    value={field.value}
                    component={CustomCreatableMultiSelect}
                    options={tags}
                    initSelections={initSelections}
                />
                <ErrorMessage name={field.name} />
            </div>
        );
    }

    return <Loading />;
};
