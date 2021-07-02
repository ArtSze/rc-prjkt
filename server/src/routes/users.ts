import Router from 'express';
import userService from '../services/userService';

export const UsersRouter = Router();

UsersRouter.get('/', async (_, res) => {
	// const collab = req.query['collab'];
	// if (collab === 'true'){
	//     await userService.getAllUsersWith Collabs()      new method
	// } else :
	try {
		const foundUsers = await userService.getAllUsers();
		res.status(200).json(foundUsers);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

UsersRouter.get('/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const foundUser = await userService.getUser(id);
		// handle user not found from the database
		if (foundUser === null) {
			return res.status(404).json({ error: 'Invalid user' });
		} else {
			return res.status(200).json(foundUser);
		}
	} catch (e) {
		return res.status(400).send(e.message);
	}
});

UsersRouter.post('/', async (req, res) => {
	try {
		const createdUser = await userService.createUser(req.body);
		res.status(200).json(createdUser);
	} catch (e) {
		res.status(400).send(e.message);
	}
});
