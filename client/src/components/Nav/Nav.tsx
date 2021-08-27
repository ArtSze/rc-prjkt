import React from 'react';
import { AppBar, Typography, Hidden, Avatar } from '@material-ui/core';
import { useStyles } from '../../static/styles';
import logo from '../../static/images/rc-logo.png';

interface NavProps {
    appBarRight: JSX.Element;
}
const Nav = ({ appBarRight }: NavProps): JSX.Element => {
    const classes = useStyles();

    return (
        <AppBar data-testid="nav" className={classes.appBar} position="fixed">
            <div className={classes.appBarLeft}>
                <Avatar variant="square" alt="logo" src={logo}></Avatar>
                <Hidden xsDown>
                    <Typography component="h1" variant="h6">
                        RC Projects
                    </Typography>
                </Hidden>
            </div>
            {appBarRight}
        </AppBar>
    );
};

export default Nav;
