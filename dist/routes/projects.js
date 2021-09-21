"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRouter = void 0;
const express_1 = __importDefault(require("express"));
const projectService_1 = __importDefault(require("../services/projectService"));
const tagService_1 = __importDefault(require("../services/tagService"));
const userService_1 = __importDefault(require("../services/userService"));
exports.ProjectsRouter = express_1.default();
const parseParams = (params, currentUser) => {
    let status;
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
    }
    else if (params['user']) {
        rcId = Number(params['user']);
    }
    const sortMethod = params['sort'];
    const tags = params['tags'];
    return { rcId, tags, status, sortMethod };
};
const filterStatus = (projects, status) => {
    if (status === false) {
        return projects.filter((project) => project.active === false);
    }
    if (status === true) {
        return projects.filter((project) => project.active === true);
    }
    return projects;
};
const sort = (projects, sortMethod) => {
    switch (sortMethod) {
        case 'last-created':
            return projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        case 'first-created':
            return projects.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        case 'first-updated':
            return projects.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
        case 'oldest-batch':
            return projects.sort((a, b) => a.owner.batchEndDate.getTime() - b.owner.batchEndDate.getTime());
        case 'latest-batch':
            return projects.sort((a, b) => b.owner.batchEndDate.getTime() - a.owner.batchEndDate.getTime());
        default:
            // last updated
            return projects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }
};
const tagCleanup = async () => {
    const projects = await projectService_1.default.getAllProjects();
    const usedTagIdsArr = projects
        .map((p) => p.tags)
        .flat()
        // @ts-ignore
        .map((t) => t._id.toString());
    const usedTagIds = [...new Set(usedTagIdsArr)];
    const allTags = await tagService_1.default.fetchAllTags();
    const tagsToDelete = allTags.filter((t) => !usedTagIds.includes(t._id.toString()));
    tagService_1.default.deleteTags(tagsToDelete);
};
exports.ProjectsRouter.get('/', async (req, res) => {
    const currentUser = req.session.user.rcId;
    const { rcId, tags, status, sortMethod } = parseParams(req.query, currentUser);
    try {
        // retreive projects by rcId and tag parameters
        // type as any instead of IProject as mongoose returns full object with helper functions
        let projects = [];
        if (rcId && tags) {
            projects = await projectService_1.default.getProjectsByUserAndTags(rcId, tags);
        }
        else if (rcId) {
            projects = await projectService_1.default.getProjectsByUser(rcId);
        }
        else if (tags) {
            projects = await projectService_1.default.getProjectsByTags(tags);
        }
        else if (!rcId && !tags) {
            projects = await projectService_1.default.getAllProjects();
        }
        // add isOwner boolean to project to confirm if the currentUser is the project owner
        let finalProjects = projects.map((p) => {
            p; // when spreading p, it includes mongoose specific information
            const isOwner = currentUser === p.owner.rcId;
            return { ...p._doc, isOwner };
        });
        // filter by status
        const filteredProjects = filterStatus(finalProjects, status);
        // sort by current sort selection
        const sortedProjects = sort(filteredProjects, sortMethod);
        return res.status(200).json(sortedProjects);
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
});
exports.ProjectsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const singleProject = await projectService_1.default.getSingleProject(id);
        res.status(200).json(singleProject);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.ProjectsRouter.post('/', async (req, res) => {
    try {
        /** comment line 94 and replace with hard-coded rcId for testing */
        // const currentUser = await userService.getUser(4383); // Artur as owner for testing
        // const currentUser = await userService.getUser(4287); // Amanda as owner for testing
        const currentUser = await userService_1.default.getUser(req.session.user.rcId);
        const tagsFromClient = req.body.tags;
        const createdTags = await tagService_1.default.createTags(tagsFromClient);
        const tagObjectIds = createdTags.map((tag) => tag._id);
        const collaboratorsFromClient = req.body.collaborators;
        const collaboratorObjectIds = await userService_1.default.fetchUserIDsByNames(collaboratorsFromClient);
        const createdProject = await projectService_1.default.createProject({
            ...req.body,
            owner: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
            tags: [...tagObjectIds],
            collaborators: [...collaboratorObjectIds],
        });
        if (currentUser) {
            currentUser.ownedProjects = [...currentUser.ownedProjects, createdProject._id];
            await currentUser.save();
            tagCleanup();
            res.status(200).json(createdProject);
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});
exports.ProjectsRouter.put('/:id', async (req, res) => {
    const currentUserId = req.session.user.rcId;
    // const currentUserId = await userService.getUser(4383); // Artur as owner for testing
    // const currentUserId = await userService.getUser(4287); // Amanda as owner for testing
    const projectToUpdateOwnerId = req.body.owner.rcId;
    const tagsFromClient = req.body.tags;
    const createdTags = await tagService_1.default.createTags(tagsFromClient);
    const tagObjectIds = createdTags.map((tag) => tag._id);
    const collaboratorsFromClient = req.body.collaborators;
    const collaboratorObjectIds = await userService_1.default.fetchUserIDsByNames(collaboratorsFromClient);
    if (currentUserId === projectToUpdateOwnerId) {
        const id = req.params.id;
        try {
            const updatedProject = await projectService_1.default.updateProject(id, {
                ...req.body,
                tags: [...tagObjectIds],
                collaborators: [...collaboratorObjectIds],
            });
            tagCleanup();
            res.status(200).json(updatedProject);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
    else {
        res.status(401).json({
            error: 'need owner permissions to update project document',
        });
    }
});
exports.ProjectsRouter.delete('/:id', async (req, res) => {
    const currentUserId = req.session.user.rcId;
    const projectToUpdateOwnerId = req.body.owner.rcId;
    if (currentUserId === projectToUpdateOwnerId) {
        try {
            const id = req.params.id;
            await projectService_1.default.deleteProject(id);
            tagCleanup();
            res.status(204).end();
        }
        catch (e) {
            res.status(400);
        }
    }
    else {
        res.status(401).json({
            error: 'need owner permissions to delete project document',
        });
    }
});
