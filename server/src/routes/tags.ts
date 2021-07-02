import Router from 'express';
import logger from '../utils/logger';
import tagService from '../services/tagService';

export const TagsRouter = Router();

TagsRouter.get('/', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });

	try {
		const allTags = await tagService.fetchAllTags();
		res.status(200).json(allTags);
	} catch (e) {
		res.status(400).send(e.message);
	}
});
