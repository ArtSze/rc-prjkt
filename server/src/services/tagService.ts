import Tag, { ITag } from '../models/tag';

export const fetchAllTags = async () => {
	return await Tag.find({});
};

export const fetchTagsByValues = (values: string[]) => {
	return values.map(async (value) => {
		return await Tag.find({ value: value });
	});
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
