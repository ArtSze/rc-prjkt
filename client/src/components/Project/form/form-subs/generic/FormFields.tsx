import React from 'react';
import { Field, FieldProps } from 'formik';
import { TextField, Switch } from 'formik-material-ui';

import { FormControlLabel } from '@material-ui/core';
import { useStyles } from '../../../../../static/styles';

export interface IFormikLabelProps extends FieldProps {
    label: string;
    placeholder?: string;
    multiline?: boolean;
}

export const CustomTextField = ({ label, field, multiline = false }: IFormikLabelProps): JSX.Element => {
    const classes = useStyles();

    return (
        <Field
            name={field.name}
            value={field.value}
            label={label}
            component={TextField}
            multiline={multiline}
            className={classes.projectFormEditFields}
        />
    );
};

export const ActiveField = ({ field }: IFormikLabelProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.projectFormCheckFields}>
            <FormControlLabel
                control={
                    <Field component={Switch} color="primary" name={field.name} type="checkbox" checked={field.value} />
                }
                label={field.value === true ? 'Active' : 'Inactive'}
            />
        </div>
    );
};
