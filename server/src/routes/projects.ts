import Router from 'express';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import userService from '../services/userService';
import { ITag } from '../models/tag';
import { ICollaboratorFromClient } from '../utils/types';

export const ProjectsRouter = Router();

ProjectsRouter.get('/', async (req, res) => {
    console.log(req.params);
    if (req.query['me']) {
        /** comment line 62 and replace with hard-coded rcId for testing */
        // const rcId = 4383; // Artur as owner for testing
        // const rcId = 4287; // Amanda as owner for testing
        const rcId = req.session.user.rcId;
        console.log({ rcId });
        try {
            if (rcId) {
                const projects = await projectService.getProjectsByUser(rcId);
                res.status(200).json(projects);
            }
        } catch (e) {
            res.status(400).send(e.message);
        }
    } else {
        let status: boolean | undefined;
        /**
         * if queryStatus is not supplied, get all projects
         * else, if true return active if false return inactive
         */
        const queryStatus = req.query['status'] ? req.query['status'] : undefined;
        if (queryStatus === 'true') {
            status = true;
        }
        if (queryStatus === 'false') {
            status = false;
        }
        const rcId = req.query['user'] ? Number(req.query['user']) : undefined;
        const tags = req.query['tags'] as string[];

        try {
            let projects = [] as any[];

            if (rcId) {
                projects = await projectService.getProjectsByUser(rcId);
            }
            if (tags) {
                projects = await projectService.getProjectsByTags(tags);
            }
            if (!rcId && !tags) {
                projects = await projectService.getAllProjects();
            }

            if (status === undefined) {
                res.status(200).json(projects);
            }

            if (status === false) {
                const inactiveProjects = projects.filter((project) => project.active === false);
                res.status(200).json(inactiveProjects);
            }

            if (status === true) {
                const activeProjects = projects.filter((project) => project.active === true);
                res.status(200).json(activeProjects);
            }
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
});

ProjectsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const singleProject = await projectService.getSingleProject(id);
        res.status(200).json(singleProject);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

ProjectsRouter.post('/', async (req, res) => {
    try {
        /** comment line 94 and replace with hard-coded rcId for testing */
        // const currentUser = await userService.getUser(4383); // Artur as owner for testing
        const currentUser = await userService.getUser(4287); // Amanda as owner for testing
        // const currentUser = await userService.getUser(req.session.user.rcId);

        const tagsFromClient = req.body.tags as ITag[];
        const createdTags = await tagService.createTags(tagsFromClient);
        const tagObjectIds = createdTags.map((tag) => tag._id);

        const collaboratorsFromClient = req.body.collaborators as ICollaboratorFromClient[];

        const collaboratorObjectIds = await userService.fetchUserIDsByNames(collaboratorsFromClient);

        const createdProject = await projectService.createProject({
            ...req.body,
            owner: currentUser?._id,
            tags: [...tagObjectIds],
            collaborators: [...collaboratorObjectIds],
        });

        if (currentUser) {
            currentUser.ownedProjects = [...currentUser.ownedProjects, createdProject._id!];
            await currentUser.save();
            res.status(200).json(createdProject);
        }
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});

ProjectsRouter.put('/:id', async (req, res) => {
    // const currentUserId = req.session.user._id;
    // const currentUserId = await userService.getUser(4383); // Artur as owner for testing
    const currentUserId = await userService.getUser(4287); // Amanda as owner for testing
    const projectToUpdateOwnerId = req.body.owner;

    const tagsFromClient = req.body.tags as ITag[];
    const createdTags = await tagService.createTags(tagsFromClient);
    const tagObjectIds = createdTags.map((tag) => tag._id);

    const collaboratorsFromClient = req.body.collaborators as ICollaboratorFromClient[];

    const collaboratorObjectIds = await userService.fetchUserIDsByNames(collaboratorsFromClient);

    if (`${currentUserId}` === projectToUpdateOwnerId) {
        // currentUserId is stringified to match projectToUpdateOwnerId
        try {
            const id = req.params.id;
            const updatedProject = await projectService.updateProject(id, {
                ...req.body,
                tags: [...tagObjectIds],
                collaborators: [...collaboratorObjectIds],
            });
            res.status(200).json(updatedProject);
        } catch (e) {
            res.status(400).send(e.message);
        }
    } else {
        res.status(401).json({
            error: 'need owner permissions to update project document',
        });
    }
});

ProjectsRouter.delete('/:id', async (req, res) => {
    const currentUserId = req.session.user._id;
    const projectToUpdateOwnerId = req.body.owner;

    if (currentUserId === projectToUpdateOwnerId) {
        try {
            const id = req.params.id;
            await projectService.deleteProject(id);
            res.status(204).end();
        } catch (e) {
            res.status(400);
        }
    } else {
        res.status(401).json({
            error: 'need owner permissions to delete project document',
        });
    }
});
