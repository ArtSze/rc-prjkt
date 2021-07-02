import Router from 'express';

import logger from '../utils/logger';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import userService from '../services/userService';
import { ITag } from '../models/tag';
import { ICollaboratorFromClient } from '../utils/types';

export const ProjectsRouter = Router();

ProjectsRouter.get('/', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });

	// const status = req.query['status'];
	// const rcId = req.query['user']
	// const tags = req.query['tags']            ex: http://localhost:4000/log-query?tags=Python&tags=Go' (tags = ["Python", "Go"])

	// if (status === 'inactive'){
	//     await projectService.getAllInactiveProjects()      new method
	// } else if (status === 'active'){
	//     await projectService.getAllActiveProjects()
	// } else if (rcId) {
	//     await projectService.getProjectsByUser(rcId)       new method
	// } else if (tags) {
	//     await projectService.getProjectsByTags(tags)
	// } else:
	try {
		const allProjects = await projectService.getAllProjects();
		res.status(200).json(allProjects);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

ProjectsRouter.get('/:id', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const id = req.params.id;
		const singleProject = await projectService.getSingleProject(id);
		res.status(200).json(singleProject);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

ProjectsRouter.post('/', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });

	try {
		const currentUser = await userService.getUser(req.session.user.rcId);

		const tagsFromClient = req.body.tags as ITag[];
		const createdTags = await tagService.createTags(tagsFromClient);
		const tagObjectIds = createdTags.map((tag) => tag._id);

		const collaboratorsFromClient = req.body
			.collaborators as ICollaboratorFromClient[];
		const collaboratorObjectIds = await userService.fetchUserIDsByValues(
			collaboratorsFromClient
		);

		const createdProject = await projectService.createProject({
			...reqBody,
			owner: currentUser?._id,
			tags: [...tagObjectIds],
			collaborators: [...collaboratorObjectIds],
		});

		if (currentUser) {
			currentUser.ownedProjects = [
				...currentUser.ownedProjects,
				createdProject._id!,
			];
			await currentUser.save();
			res.status(200).json(createdProject);
		}
	} catch (e) {
		res.status(400).send(e.message);
	}
});

ProjectsRouter.put('/:id', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });

	const currentUserId = req.session.user._id;
	const projectToUpdateOwnerId = req.body.owner;

	const tagsFromClient = req.body.tags as ITag[];
	const createdTags = await tagService.createTags(tagsFromClient);
	const tagObjectIds = createdTags.map((tag) => tag._id);

	const collaboratorsFromClient = req.body
		.collaborators as ICollaboratorFromClient[];
	const collaboratorObjectIds = await userService.fetchUserIDsByValues(
		collaboratorsFromClient
	);

	if (currentUserId === projectToUpdateOwnerId) {
		try {
			const id = req.params.id;
			const updatedProject = await projectService.updateProject(id, {
				...reqBody,
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
	const reqBody = req.body;
	logger.info({ reqBody });

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
