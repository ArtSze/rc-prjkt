import React from 'react';
import { useStyles } from '../../static/styles';
import { Typography, Button, Link } from '@material-ui/core';
import logo from '../../static/images/rc-logo.png';
import Container from '@material-ui/core/Container';
import { authURL } from '../../utils/axiosInstance';
import NavAuth from '../Nav/NavAuth';
import Nav from '../Nav/Nav';

const Auth = (): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <Nav appBarRight={<NavAuth />} />
            <Container data-testid="auth-main" className={classes.auth} maxWidth="sm">
                <img alt="logo" src={logo}></img>
                <Typography component="h2" variant="h5">
                    Welcome to RC Projects!
                </Typography>
                <Typography variant="body2">Please authorize using your Recurse Center data to continue</Typography>
                <Button href={authURL} fullWidth variant="contained" color="secondary">
                    Authorize
                </Button>
                <Link
                    // href="https://projects-demo.recurse.com/"
                    href={process.env.DEMO_URL}
                    rel="noreferrer"
                    target="_blank"
                    variant="button"
                    color="secondary"
                >
                    Click here to see a demo version
                </Link>
            </Container>
        </>
    );
};

export default Auth;
