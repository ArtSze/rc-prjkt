import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { useStyles } from '../../static/styles';
import NavNotFound from '../Nav/NavNotFound';
import Nav from '../Nav/Nav';

const NotFound = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Container>
            <Nav appBarRight={<NavNotFound />} />
            <Container maxWidth="md" className={classes.notFound}>
                <Typography variant="h2" component="h1">
                    404: Not Found
                </Typography>
                <Button href="/" variant="contained" color="secondary" className={classes.notFoundButton}>
                    Home
                </Button>
            </Container>
        </Container>
    );
};

export default NotFound;
