import Tag, { ITag } from '../models/tag';

export const fetchAllTags = async () => {
	return await Tag.find({});
};

export const fetchTagsByValues = async (values: string[]) => {
	return await Tag.find().where('value').in(values);
};

export const fetchSingleTagByValue = async (value: string) => {
	return await Tag.find({ value: value });
};

export const createTag = async (tag: ITag) => {
	const tagToSave = new Tag(tag);
	const savedTag = await tagToSave.save();
	return savedTag;
};

export const createTags = async (tags: ITag[]) => {
	const tagPromises = tags.map(async (tag) => {
		return await Tag.findOneAndUpdate(
			{ 'category': tag.category, 'value': tag.value },
			tag,
			{ new: true, upsert: true })
	})
	const newTags = await Promise.all(tagPromises)
	return newTags
}

export default {
	createTag,
	createTags,
	fetchAllTags,
	fetchTagsByValues,
	fetchSingleTagByValue,
};