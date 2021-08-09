import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../../utils/axiosInstance';
import { IProject } from '../../types/types';
import constants from '../../utils/constants';
import { useStyles } from '../../static/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

const DeleteConfirmationModal = (project: IProject): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (project: IProject) =>
            axiosInstance.delete(`projects/${project._id}`, {
                data: project,
                withCredentials: true,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(constants.projects);
                queryClient.invalidateQueries(constants.tags);
            },
        },
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAndClose = () => {
        handleClose();
        deleteMutation.mutate(project);
    };

    return (
        <div>
            <Button className={classes.ownerDeleteButton} size="small" variant="outlined" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{'Delete Project'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you would like to delete this project listing? This action cannot be undone and
                        this listing will be gone forever.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        className={classes.ownerDeleteConfirmationButton}
                        onClick={deleteAndClose}
                        variant="outlined"
                        autoFocus
                    >
                        Confirm Deletion
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteConfirmationModal;
