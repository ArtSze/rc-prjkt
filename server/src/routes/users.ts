import Router from 'express';
import userService from '../services/userService';

export const UsersRouter = Router();

UsersRouter.get('/', async (req, res) => {
    let omission: boolean | undefined;

    const omitSelf = req.query['omitSelf'] ? req.query['omitSelf'] : undefined;

    if (omitSelf === 'true') {
        omission = true;
    }
    if (omitSelf === 'false') {
        omission = false;
    }

    try {
        const foundUsers = await userService.getAllUsers();
        if (omission === true) {
            const finalUsers = foundUsers.filter((u) => u.rcId !== req.session.user.rcId);
            res.status(200).json(finalUsers);
        } else {
            console.log({ ...res.header });
            res.status(200).json(foundUsers);
        }
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
