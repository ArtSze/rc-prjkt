import Router from 'express';
import projectService from '../services/projectService';
import logger from '../utils/logger';

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
		const createdProject = await projectService.createProject(reqBody);
		res.status(200).json(createdProject);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

ProjectsRouter.put('/:id', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const id = req.params.id;
		const updatedProject = await projectService.updateProject(id, reqBody);
		res.status(200).json(updatedProject);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

ProjectsRouter.delete('/:id', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const id = req.params.id;
		await projectService.deleteProject(id);
		res.status(204).end();
	} catch (e) {
		res.status(401);
	}
});
