import Router from 'express';

import Project from '../models/project';
import Tag from '../models/tag';
import User from '../models/user';

export const NukeRouter = Router();

NukeRouter.get('/', async (_, res) => {
    try {
        await Project.deleteMany({});
        await Tag.deleteMany({});
        await User.deleteMany({});
        return res.status(204).end();
    } catch (e) {
        res.status(400);
    }
});
