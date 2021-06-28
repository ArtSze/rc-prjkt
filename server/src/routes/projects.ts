import Router from 'express';

import logger from '../utils/logger';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import userService from '../services/userService';
import { ITag } from '../models/tag';

export const ProjectsRouter = Router();

ProjectsRouter.get('/', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
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
		const tagsFromClient = req.body.tags as ITag[];
		const tagsToCreate = tagsFromClient.map(async (tag) => {
			const found = await tagService.fetchSingleTagByValue(tag.value);
			if (!found) return tag;
			else return null;
		});
		const tagObjectIds = tagsToCreate.map(async (tag) => {
			// @ts-expect-error
			const createdTag = await tagService.createTag(tag);
			return createdTag._id;
		});

		const currentUser = await userService.getUser(req.session.user.rcId);

		const createdProject = await projectService.createProject({
			...reqBody,
			owner: currentUser?._id,
			tags: tagObjectIds,
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
	const projectToUpdateId = req.body.owner;

	const tagsFromClient = req.body.tags as ITag[];

	// first solution (commented out) is convoluted; there must be a simpler way of doing this
	// (what I'm trying to accomplish: check to see if tag documents exist in DB for tags passed
	// from the client side... if not: create new Tag document, select its ._id and pass it as an
	// arg to the updateProject call)

	// const tagValues = tagsFromClient.map((tag) => tag.value);
	// const tagsInDB = tagService.fetchTagsByValues(tagValues);
	// const tagsToCreate = tagsFromClient.filter(
	// 	(tag) => !tagsInDB.includes(tag)
	// );

	const tagsToCreate = tagsFromClient.map(async (tag) => {
		const found = await tagService.fetchSingleTagByValue(tag.value);
		if (!found) return tag;
		else return null;
	});

	const tagObjectIds = tagsToCreate.map(async (tag) => {
		// @ts-expect-error
		const createdTag = await tagService.createTag(tag);
		return createdTag._id;
	});

	if (currentUserId === projectToUpdateId) {
		try {
			const id = req.params.id;
			const updatedProject = await projectService.updateProject(id, {
				...reqBody,
				tags: tagObjectIds,
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
	const projectToUpdateId = req.body.owner;

	if (currentUserId === projectToUpdateId) {
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
