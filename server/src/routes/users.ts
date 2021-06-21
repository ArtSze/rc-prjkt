import Router from 'express';
import logger from '../utils/logger';
import userService from '../services/userService';

export const UsersRouter = Router();

UsersRouter.get('/:id', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const id = req.params.id;
		const foundUser = userService.getUser(id);
		res.status(200).json(foundUser);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

UsersRouter.post('/', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const createdUser = userService.createUser(reqBody.rcId);
		res.status(200).json(createdUser);
	} catch (e) {
		res.status(400).send(e.message);
	}
});
