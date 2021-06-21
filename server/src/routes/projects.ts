import Router from 'express';
import logger from '../utils/logger';

export const ProjectsRouter = Router();

ProjectsRouter.get('/:projectid', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	res.status(200).json('TODO [GET] get project');
});

ProjectsRouter.post('/', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	res.status(200).json('TODO [POST] new project');
});

ProjectsRouter.delete('/:projectid', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	res.status(200).json('TODO [DELETE] remove project');
});

ProjectsRouter.put('/:projectid', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	res.status(200).json('TODO [PUT] update project');
});
