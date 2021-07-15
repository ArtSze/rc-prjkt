import Router from 'express';
import tagService from '../services/tagService';

export const TagsRouter = Router();

TagsRouter.get('/', async (_, res) => {
    try {
        const allTags = await tagService.fetchAllTags();
        res.status(200).json(allTags);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
