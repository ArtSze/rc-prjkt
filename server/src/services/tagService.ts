import Tag, { ITag } from '../models/tag';

/**
 * Retrieve all tags in the database
 *
 * @return {Promise<(ITag & mongoose.Document)[]>} All tags in the database
 */
export const fetchAllTags = async () => {
    return await Tag.find({});
};

/**
 * Retrieve tags in the database from a provided list of values
 *
 * @param {string[]} values - Array of tag values
 *
 * @return {Promise<(ITag & mongoose.Document)[]>} All tags in the database for provided values
 */
export const fetchTagsByValues = async (values: string[]) => {
    return await Tag.find().where('value').in(values);
};

/**
 * Retrieve tags in the database from a provided value
 *
 * @param {string[]} values - A tag value
 *
 * @return {Promise<(ITag & mongoose.Document)[]>} All tags in the database for provided value
 */
export const fetchSingleTagByValue = async (value: string) => {
    return await Tag.find({ value: value });
};

/**
 * Creates a new tag in the database
 *
 * @param {ITag} tag - A tag object containing a value
 *
 * @return {Promise<ITag & mongoose.Document>} Newly created tag document from the database
 */
export const createTag = async (tag: ITag) => {
    const tagToSave = new Tag(tag);
    const savedTag = await tagToSave.save();
    return savedTag;
};

/**
 * Creates new tags in the database
 *
 * @remark Query has option `upsert: true` which returns tag if it already exists in the database or creates a tag if it doesn't exist
 *
 * @param {ITag[]} tags - An array of tag objects
 *
 * @return {Promise<ITag & mongoose.Document>} Created tags in the database
 */
export const createTags = async (tags: ITag[]) => {
    const tagPromises = tags.map(async (tag) => {
        return await Tag.findOneAndUpdate({ value: tag.value }, tag, {
            new: true,
            upsert: true,
            runValidators: true,
        });
    });
    const newTags = await Promise.all(tagPromises);
    return newTags;
};

export const deleteTags = async (tags: ITag[]) => {
    const tagPromises = tags.map(async (tag) => {
        return await Tag.findOneAndDelete({ value: tag.value });
    });
    return await Promise.all(tagPromises);
};

export default {
    createTag,
    createTags,
    fetchAllTags,
    fetchTagsByValues,
    fetchSingleTagByValue,
    deleteTags,
};
