import React, { useState } from 'react';

import { Dialog, DialogContent, DialogTitle, Button, useMediaQuery } from '@material-ui/core';
import ProjectFormAdd from './ProjectFormAdd';
import { FaPlus } from 'react-icons/fa';

const AddFormModal = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 650px)');

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
                data-testid="add-project-button"
            >
                {isSmallScreen ? <FaPlus /> : 'Add Project'}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth={true}>
                <DialogTitle data-testid="add-project-modal-title">{'Add Project'}</DialogTitle>
                <DialogContent>
                    <ProjectFormAdd setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddFormModal;
