import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FaGithub, FaHeart } from 'react-icons/fa';
import { useStyles } from '../../static/styles';
import { Grid } from '@material-ui/core';

export default function Footer(): JSX.Element {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="center" className={classes.footer}>
            <Typography variant="body1">
                <Link
                    title="Recurse Center Logo"
                    color="textSecondary"
                    href="https://recurse.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    Made with <FaHeart /> at the Recurse Center
                </Link>
            </Typography>
            <Typography variant="body1">
                <Link
                    color="textSecondary"
                    title="GitHub Repo Link"
                    href="https://github.com/ArtSze/rc-prjkt"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub /> View source code
                </Link>
            </Typography>
        </Grid>
    );
}
