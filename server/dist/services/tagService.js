"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTags = exports.createTags = exports.createTag = exports.fetchSingleTagByValue = exports.fetchTagsByValues = exports.fetchAllTags = void 0;
const tag_1 = __importDefault(require("../models/tag"));
/**
 * Retrieve all tags in the database
 *
 * @return {Promise<(ITag & mongoose.Document)[]>} All tags in the database
 */
const fetchAllTags = async () => {
    return await tag_1.default.find({});
};
exports.fetchAllTags = fetchAllTags;
/**
 * Retrieve tags in the database from a provided list of values
 *
 * @param {string[]} values - Array of tag values
 *
 * @return {Promise<(ITag & mongoose.Document)[]>} All tags in the database for provided values
 */
const fetchTagsByValues = async (values) => {
    return await tag_1.default.find().where('value').in(values);
};
exports.fetchTagsByValues = fetchTagsByValues;
/**
 * Retrieve tags in the database from a provided value
 *
 * @param {string[]} values - A tag value
 *
 * @return {Promise<(ITag & mongoose.Document)[]>} All tags in the database for provided value
 */
const fetchSingleTagByValue = async (value) => {
    return await tag_1.default.find({ value: value });
};
exports.fetchSingleTagByValue = fetchSingleTagByValue;
/**
 * Creates a new tag in the database
 *
 * @param {ITag} tag - A tag object containing a value
 *
 * @return {Promise<ITag & mongoose.Document>} Newly created tag document from the database
 */
const createTag = async (tag) => {
    const tagToSave = new tag_1.default(tag);
    const savedTag = await tagToSave.save();
    return savedTag;
};
exports.createTag = createTag;
/**
 * Creates new tags in the database
 *
 * @remark Query has option `upsert: true` which returns tag if it already exists in the database or creates a tag if it doesn't exist
 *
 * @param {ITag[]} tags - An array of tag objects
 *
 * @return {Promise<ITag & mongoose.Document>} Created tags in the database
 */
const createTags = async (tags) => {
    const tagPromises = tags.map(async (tag) => {
        return await tag_1.default.findOneAndUpdate({ value: tag.value }, tag, {
            new: true,
            upsert: true,
            runValidators: true,
        });
    });
    const newTags = await Promise.all(tagPromises);
    return newTags;
};
exports.createTags = createTags;
const deleteTags = async (tags) => {
    const tagPromises = tags.map(async (tag) => {
        return await tag_1.default.findOneAndDelete({ value: tag.value });
    });
    return await Promise.all(tagPromises);
};
exports.deleteTags = deleteTags;
exports.default = {
    createTag: exports.createTag,
    createTags: exports.createTags,
    fetchAllTags: exports.fetchAllTags,
    fetchTagsByValues: exports.fetchTagsByValues,
    fetchSingleTagByValue: exports.fetchSingleTagByValue,
    deleteTags: exports.deleteTags,
};
