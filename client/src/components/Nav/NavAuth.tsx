import { Button } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../../static/styles';
import { authURL } from '../../utils/axiosInstance';

export const NavAuth = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.appBarRight}>
            <Button className={classes.navButton} variant="contained" color="secondary" href={authURL}>
                Authorize
            </Button>
        </div>
    );
};

export default NavAuth;
