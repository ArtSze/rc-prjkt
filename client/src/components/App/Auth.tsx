import React from 'react';
import { useStyles } from '../../static/styles';
import { AppBar, Typography, Button, Avatar, Hidden } from '@material-ui/core';
import logo from '../../static/images/rc-logo.png';
import Container from '@material-ui/core/Container';
import { authURL } from '../../utils/axiosInstance';

const Auth = (): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <AppBar data-testid="auth-header" className={classes.appBar} position="fixed">
                <div className={classes.appBarLeft}>
                    <Avatar variant="square" alt="logo" src={logo}></Avatar>
                    <Hidden xsDown>
                        <Typography component="h1" variant="h6">
                            RC Projects
                        </Typography>
                    </Hidden>
                </div>
                <div className={classes.appBarRight}>
                    <Button className={classes.navButton} variant="contained" color="secondary" href={authURL}>
                        Authorize
                    </Button>
                </div>
            </AppBar>
            <Container data-testid="auth-main" className={classes.auth} maxWidth="sm">
                <img alt="logo" src={logo}></img>
                <Typography component="h2" variant="h5">
                    Welcome to RC Projects!
                </Typography>
                <Typography variant="body2">Please authorize using your Recurse Center data to continue</Typography>
                <Button href={authURL} fullWidth variant="contained" color="secondary">
                    Authorize
                </Button>
            </Container>
        </>
    );
};

export default Auth;
