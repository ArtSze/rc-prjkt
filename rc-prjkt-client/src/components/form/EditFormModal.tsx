import React, { useState } from 'react';

import { IProject } from '../../types';

import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';
import ProjectFormEdit from './ProjectFormEdit';

const EditFormModal = (project: IProject): JSX.Element => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)} size="small" color="primary" variant="outlined">
                Edit
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth={true}>
                <DialogTitle>{'Edit Project'}</DialogTitle>
                <DialogContent>
                    <ProjectFormEdit projectToEdit={project} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditFormModal;
