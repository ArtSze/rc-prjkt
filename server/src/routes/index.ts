import Router from 'express';
import logger from '../utils/logger';

export const IndexRouter = Router();

IndexRouter.get('/', (req, res) => {
	const reqBody = req.body;
	logger.info({ current_user: req.session.user });
	logger.info({ reqBody });
	res.status(200).json('TODO [GET] get all projects');
});
