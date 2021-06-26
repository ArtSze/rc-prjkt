import Tag, { ITag } from '../models/tag';

export const fetchAllTags = async () => {
	return await Tag.find({});
};

export const fetchTagsByValues = async (values: string[]) => {
	// QUESTION
	// corrected this function to return a Promise array rather than an array of promises

	// const results = values.map(value => Tag.find({ value }))
	// const data = await Promise.all(results);
	// return data.flat()

	// but i think this is better:
	return await Tag.find().where('value').in(values)

	// does this break anything in the projects router?
};

export const fetchSingleTagByValue = async (value: string) => {
	return await Tag.find({ value: value });
};

export const createTag = async (tag: ITag) => {
	const tagToSave = new Tag(tag);
	const savedTag = await tagToSave.save();
	return savedTag;
};

export default {
	createTag,
	fetchAllTags,
	fetchTagsByValues,
	fetchSingleTagByValue,
};
