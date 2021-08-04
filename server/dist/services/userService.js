"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
/**
 * Retrieve all users in the database including their owned projects and collaborated projects
 *
 * @return {Promise<(IUser & mongoose.Document)[]>} All users in the database
 */
const getAllUsers = async () => {
    return await user_1.default.find({})
        .populate('ownedProjects', {
        _id: 1,
        title: 1,
        description: 1,
        githubLink: 1,
        owner: 1,
        collaborators: 1,
        tags: 1,
        active: 1,
    })
        .populate('collabProjects', {
        _id: 1,
        title: 1,
        description: 1,
        githubLink: 1,
        owner: 1,
        collaborators: 1,
        tags: 1,
        active: 1,
        image_path: 1,
    });
};
/**
 * Retrieve a single user from the database including their owned projects and collaborated projects
 *
 * @return {Promise<(IUser & mongoose.Document)>} A single user from the database
 */
const getUser = async (rcId) => {
    return await user_1.default.findOne({ rcId: rcId })
        .populate('ownedProjects', {
        _id: 1,
        title: 1,
        description: 1,
        githubLink: 1,
        owner: 1,
        collaborators: 1,
        tags: 1,
        active: 1,
    })
        .populate('collabProjects', {
        _id: 1,
        title: 1,
        description: 1,
        githubLink: 1,
        owner: 1,
        collaborators: 1,
        tags: 1,
        active: 1,
        image_path: 1,
    });
};
/**
 * Retrieve userIDs from the database
 *
 * @param {ICollaboratorFromClient[]} collaborators - Array of first_name and last_name properties
 *
 * @return {Promise<(Mongoose.types.ObjectId & mongoose.Document)[]>} All userIDs in the database for provided names
 */
const fetchUserIDsByNames = async (collaborators) => {
    const userPromises = collaborators.map(async (collaborator) => {
        return await user_1.default.findOne({
            first_name: collaborator.first_name,
            last_name: collaborator.last_name,
        }).select('_id');
    });
    const userIDs = await Promise.all(userPromises);
    return userIDs;
};
/**
 * Creates a new user in the database
 *
 * @remarks Create user is called from the authentication router which provides an object from the RC API containing the user data based on their authentication token.
 *
 * @param {IUserFromRCAPI} userData - An object containing user data from the RC API
 *
 * @return {Promise<ITag & mongoose.Document>} Newly created tag document from the database
 */
const createUser = async (userData) => {
    const user = new user_1.default({
        ownedProjects: [],
        collabProjects: [],
        ...userData,
    });
    const savedUser = await user.save();
    return savedUser;
};
exports.default = { getAllUsers, getUser, fetchUserIDsByNames, createUser };
