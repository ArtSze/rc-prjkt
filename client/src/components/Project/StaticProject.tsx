import React from 'react';
import { IProject, IProjectOwnerCheck } from '../../types/types';
import { useStore, AppState } from '../../utils/store';
import { formatURL } from '../../utils/formatUrl';

import { useStyles } from '../../static/styles';
import EditFormModal from './form/EditFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ProjectOwnerImage from './ProjectOwnerImage';

import { SiGithub, SiZulip } from 'react-icons/si';
import { FaTag } from 'react-icons/fa';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Link,
    Avatar,
    IconButton,
    Divider,
    Container,
    Grid,
    CardHeader,
    Hidden,
} from '@material-ui/core';

const StaticProject = (project: IProject): JSX.Element => {
    const classes = useStyles();

    const setOwnerFilter = useStore((state: AppState) => state.setOwnerFilter);
    const setTagFilter = useStore((state: AppState) => state.setTagFilter);
    const tagFilter = useStore((state: AppState) => state.tagFilter);
    const allProjects = useStore((state: AppState) => state.allProjects);

    const ownerProject = project as IProjectOwnerCheck;

    const tags = (
        <Container disableGutters className={classes.marginBottom}>
            <Typography variant="subtitle2" gutterBottom>
                Tags
            </Typography>
            {project.tags.length ? (
                <Grid>
                    {project.tags.map((tag) => {
                        return (
                            <Chip
                                disabled={!allProjects}
                                className={classes.chip}
                                key={tag._id.toString()}
                                icon={<FaTag />}
                                label={`${tag.value}`}
                                onClick={() => {
                                    tagFilter ? setTagFilter([...tagFilter, tag.value]) : setTagFilter([tag.value]);
                                }}
                            />
                        );
                    })}
                </Grid>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No Tags
                </Typography>
            )}
        </Container>
    );

    const collaborators = (
        <Container disableGutters className={classes.marginBottom}>
            <Typography variant="subtitle2" gutterBottom>
                Collaborators
            </Typography>
            {project.collaborators.length ? (
                <Grid>
                    {project.collaborators.map((collaborator) => {
                        return (
                            <Chip
                                disabled={!allProjects}
                                className={classes.chip}
                                key={collaborator._id.toString()}
                                avatar={
                                    <Avatar
                                        alt={`${collaborator.first_name} ${collaborator.last_name}`}
                                        src={collaborator.image_path}
                                    ></Avatar>
                                }
                                label={`${collaborator.first_name} ${collaborator.last_name}`}
                                onClick={() => {
                                    setOwnerFilter(collaborator.rcId);
                                }}
                            />
                        );
                    })}
                </Grid>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No Collaborators
                </Typography>
            )}
        </Container>
    );

    return (
        <Card data-testid="project" className={classes.staticProject}>
            <CardHeader
                className={classes.cardHeader}
                disableTypography
                title={
                    <Grid container alignItems="center" className={classes.bigGridGap}>
                        <Grid item>
                            <Typography variant="h6">{project.title}</Typography>
                        </Grid>
                        <Grid item>
                            {project.active ? (
                                <Typography variant="button" color="primary">
                                    active
                                </Typography>
                            ) : (
                                <Typography variant="button" color="error">
                                    inactive
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                }
                avatar={
                    <Hidden xsDown>
                        <ProjectOwnerImage project={project}></ProjectOwnerImage>
                    </Hidden>
                }
                action={
                    <Grid container alignItems="center">
                        {ownerProject.isOwner && (
                            <>
                                <EditFormModal {...project} />
                                <DeleteConfirmationModal {...project} />
                            </>
                        )}
                        <IconButton href={formatURL(project.githubLink)} rel="noreferrer" target="_blank">
                            <SiGithub />
                        </IconButton>
                        <IconButton
                            rel="noreferrer"
                            target="_blank"
                            href={'https://recurse.zulipchat.com/#narrow/pm-with/' + project.owner.zulip_id}
                        >
                            <SiZulip />
                        </IconButton>
                    </Grid>
                }
                subheader={
                    <>
                        <Link className={classes.cursorPointer} onClick={() => setOwnerFilter(project.owner.rcId)}>
                            <Typography variant="body2" color="textSecondary">
                                {`${project.owner.first_name} ${project.owner.last_name} (${project.owner.batch})`}
                            </Typography>
                        </Link>
                    </>
                }
            ></CardHeader>
            <CardContent>
                <Container data-testid="project-description" className={classes.staticProjectDetails}>
                    <Divider className={classes.staticProjectDivider} />
                    <Typography style={{ whiteSpace: 'pre-line' }} variant="body1" paragraph>
                        {project.description}
                    </Typography>
                    <Grid container>
                        <Grid data-testid="project-collaborators" xs={12} lg={4} item>
                            {collaborators}
                        </Grid>
                        <Grid data-testid="project-tags" xs={12} lg={8} item>
                            {tags}
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    );
};

export default StaticProject;
