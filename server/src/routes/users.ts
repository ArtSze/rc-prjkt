import Router from 'express';
import logger from '../utils/logger';
import userService from '../services/userService';

export const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const foundUsers = userService.getAllUsers();
		res.status(200).json(foundUsers);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

UsersRouter.get('/:id', async (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const id = parseInt(req.params.id);
		const foundUser = await userService.getUser(id);
		res.status(200).json(foundUser);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

UsersRouter.post('/', (req, res) => {
	const reqBody = req.body;
	logger.info({ reqBody });
	try {
		const createdUser = userService.createUser(reqBody);
		res.status(200).json(createdUser);
	} catch (e) {
		res.status(400).send(e.message);
	}
});
