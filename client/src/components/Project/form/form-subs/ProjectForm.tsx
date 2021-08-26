import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import { ActiveField, CustomTextField } from './generic/FormFields';
import { CollaboratorField } from './CollaboratorField';
import { ProjectFormSubmitValues } from '../ProjectFormAdd';
import { TagField } from './TagField';

import { useStyles } from '../../../../static/styles';
import { Button, Grid } from '@material-ui/core';

interface Props {
    onSubmit: (values: ProjectFormSubmitValues) => Promise<void>;
    onCancel: () => void;
    initialValues: ProjectFormSubmitValues;
}

const ProjectForm = ({ onSubmit, onCancel, initialValues }: Props): JSX.Element => {
    const classes = useStyles();

    const URL =
        /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                title: Yup.string().max(160, 'must be 160 characters or less').required('title is required'),
                description: Yup.string()
                    .min(20, 'must be 20 characters or longer')
                    .max(480, 'must be 480 characters or less')
                    .notRequired(),
                githubLink: Yup.string().matches(URL, 'enter a valid url').notRequired(),
                active: Yup.bool().notRequired(),
            })}
        >
            <Form className={classes.projectForm}>
                <Grid container direction="column">
                    <Grid item container className={classes.projectFormRow}>
                        <Grid item xs={12} sm={10} className={classes.titleGridItem}>
                            <Field
                                name="title"
                                label="Title"
                                component={CustomTextField}
                                data-testid="form-title-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Field name="active" component={ActiveField} data-testid="form-active-field" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="description"
                            label="Description"
                            multiline={true}
                            component={CustomTextField}
                            data-testid="form-description-field"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="githubLink"
                            label="GitHub Link"
                            component={CustomTextField}
                            data-testid="form-github-field"
                        />
                    </Grid>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                name="collaborators"
                                label="Collaborators"
                                component={CollaboratorField}
                                data-testid="form-collaborator-field"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field name="tags" label="Tags" component={TagField} data-testid="form-tag-field" />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formSubmitRow}>
                        <Button
                            type="submit"
                            size="small"
                            color="primary"
                            variant="outlined"
                            className={classes.button}
                            data-testid="form-submit-button"
                        >
                            Submit
                        </Button>
                        <Button
                            type="button"
                            onClick={onCancel}
                            size="small"
                            color="primary"
                            variant="outlined"
                            style={{ color: 'red', borderColor: 'red' }}
                            className={classes.button}
                            data-testid="form-cancel-button"
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
};

export default ProjectForm;
