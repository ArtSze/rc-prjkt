import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from '../../static/styles';

const NavNotFound = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.appBarRight}>
            <Button className={classes.navButton} variant="contained" color="secondary" href="/">
                Home
            </Button>
        </div>
    );
};

export default NavNotFound;
