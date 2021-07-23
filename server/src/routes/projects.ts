import Router from 'express';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import userService from '../services/userService';
import { ITag } from '../models/tag';
import { ICollaboratorFromClient } from '../utils/types';
import { IProject } from '../models/project';

export const ProjectsRouter = Router();

function parseParams(params: any, currentUser: number) {
    let status: boolean | undefined;
    /**
     * if queryStatus is not supplied, get all projects
     * else, if true return active if false return inactive
     */
    const queryStatus = params['status'] ? params['status'] : undefined;

    if (queryStatus === 'true') {
        status = true;
    }
    if (queryStatus === 'false') {
        status = false;
    }
    let rcId = undefined;

    if (params['me']) {
        rcId = currentUser;
    } else if (params['user']) {
        rcId = Number(params['user']);
    }

    const sortMethod = params['sort'];
    const tags = params['tags'] as string[];
    return { rcId, tags, status, sortMethod };
}

function filterStatus(projects: IProject[], status: boolean | undefined) {
    if (status === false) {
        return projects.filter((project) => project.active === false);
    }

    if (status === true) {
        return projects.filter((project) => project.active === true);
    }

    return projects;
}

function sort(projects: IProject[], sortMethod: string) {
    switch (sortMethod) {
        case 'last created':
            return projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        case 'first created':
            return projects.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        case 'first updated':
            return projects.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
        case 'oldest batch':
            return projects.sort((a, b) => a.owner.batchEndDate.getTime() - b.owner.batchEndDate.getTime());
        case 'latest batch':
            return projects.sort((a, b) => b.owner.batchEndDate.getTime() - a.owner.batchEndDate.getTime());
        default:
            // last updated
            return projects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }
}

ProjectsRouter.get('/', async (req, res) => {
    const currentUser = req.session.user.rcId;
    const { rcId, tags, status, sortMethod } = parseParams(req.query, currentUser);

    try {
        // retreive projects by rcId and tag parameters
        // type as any instead of IProject as mongoose returns full object with helper functions
        let projects = [] as any[];
        if (rcId && tags) {
            projects = await projectService.getProjectsByUserAndTags(rcId, tags);
            console.log({ projects });
        } else if (rcId) {
            projects = await projectService.getProjectsByUser(rcId);
        } else if (tags) {
            projects = await projectService.getProjectsByTags(tags);
        } else if (!rcId && !tags) {
            projects = await projectService.getAllProjects();
        }

        // add isOwner boolean to project to confirm if the currentUser is the project owner
        let finalProjects = projects.map((p) => {
            p as any; // when spreading p, it includes mongoose specific information
            const isOwner = currentUser === p.owner.rcId;
            return { ...p._doc, isOwner };
        });

        // filter by status
        const filteredProjects = filterStatus(finalProjects, status);

        // sort by current sort selection
        const sortedProjects = sort(filteredProjects, sortMethod);

        return res.status(200).json(sortedProjects);
    } catch (e) {
        return res.status(400).send(e.message);
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
        // const currentUser = await userService.getUser(4287); // Amanda as owner for testing
        const currentUser = await userService.getUser(req.session.user.rcId);

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
    const currentUserId = req.session.user.rcId;
    // const currentUserId = await userService.getUser(4383); // Artur as owner for testing
    // const currentUserId = await userService.getUser(4287); // Amanda as owner for testing
    const projectToUpdateOwnerId = req.body.owner.rcId;

    const tagsFromClient = req.body.tags as ITag[];
    const createdTags = await tagService.createTags(tagsFromClient);
    const tagObjectIds = createdTags.map((tag) => tag._id);

    const collaboratorsFromClient = req.body.collaborators as ICollaboratorFromClient[];

    const collaboratorObjectIds = await userService.fetchUserIDsByNames(collaboratorsFromClient);

    console.log(currentUserId, projectToUpdateOwnerId);

    if (currentUserId === projectToUpdateOwnerId) {
        const id = req.params.id;
        try {
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
    console.log('projects.delete');
    const currentUserId = req.session.user.rcId;
    const projectToUpdateOwnerId = req.body.owner.rcId;

    console.log({ currentUserId, projectToUpdateOwnerId });

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
