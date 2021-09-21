"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../models/project"));
const tagService_1 = __importDefault(require("./tagService"));
const userService_1 = __importDefault(require("./userService"));
/**
 * Returns all of the projects in the database
 *
 * @return {Promise<Array<IProject>>} Promise containing an array of projects
 */
const getAllProjects = async () => {
    return await project_1.default.find({})
        .populate('owner', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        zulip_id: 1,
        batchEndDate: 1,
        batch: 1,
        image_path: 1,
    })
        .populate('collaborators', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        image_path: 1,
    })
        .populate('tags', {
        value: 1,
    });
};
/**
 * Returns all of the projects corresponding to the boolean value of 'status'
 *
 * @param {boolean} status - indicates whether or not a project is currently active
 *
 * @remark
 * Active projects have a property of `active` that returns `true` and Inactive have a property of `active` that returns `false`
 *
 * @return {Promise<(IProject & mongoose.Document)[]>} Promise containing an array of projects
 */
const getProjectsByStatus = async (status) => {
    return await project_1.default.find({ active: status })
        .populate('owner', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        zulip_id: 1,
        batchEndDate: 1,
        batch: 1,
        image_path: 1,
    })
        .populate('collaborators', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        image_path: 1,
    })
        .populate('tags', {
        value: 1,
    });
};
/**
 * Returns all projects in the database belonging to a specific user
 *
 * @param {number} rcId - the user's ID from the database
 *
 * @return {Promise<Array<IProject>> | null } Promise containing an array of projects or null if no project is found
 */
const getProjectsByUser = async (rcId) => {
    const user = await userService_1.default.getUser(rcId);
    return await project_1.default.find({ owner: user === null || user === void 0 ? void 0 : user._id })
        .populate('owner', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        zulip_id: 1,
        batchEndDate: 1,
        batch: 1,
        image_path: 1,
    })
        .populate('collaborators', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        image_path: 1,
    })
        .populate('tags', {
        value: 1,
    });
};
const getProjectsByUserAndTags = async (rcId, tags) => {
    const user = await userService_1.default.getUser(rcId);
    const tagDocs = await tagService_1.default.fetchTagsByValues(tags);
    const tagIds = tagDocs.map((tag) => tag._id);
    return await project_1.default.find({ $and: [{ owner: user === null || user === void 0 ? void 0 : user._id }, { tags: { $all: tagIds } }] })
        .populate('owner', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        zulip_id: 1,
        batchEndDate: 1,
        batch: 1,
        image_path: 1,
    })
        .populate('collaborators', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        image_path: 1,
    })
        .populate('tags', {
        value: 1,
    });
};
/**
 * Returns all projects in the database that contain specific tags
 *
 * @param {Array<string>} tags - Tags that affect the scope of the database query
 *
 * @return {Promise<Array<IProject>> | null } Promise containing an array of projects or null if no project is found
 */
const getProjectsByTags = async (tags) => {
    const tagDocs = await tagService_1.default.fetchTagsByValues(tags);
    const tagIds = tagDocs.map((tag) => tag._id);
    return await project_1.default.find({ tags: { $all: tagIds } })
        .populate('owner', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        zulip_id: 1,
        batchEndDate: 1,
        batch: 1,
        image_path: 1,
    })
        .populate('collaborators', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        image_path: 1,
    })
        .populate('tags', {
        value: 1,
    });
};
/**
 * Returns a single project in the database
 *
 * @param {string} id - the project's ID from the database
 *
 * @return {Promise<Array<IProject>> | null } Promise containing an array of projects or null if no project is found
 */
const getSingleProject = async (id) => {
    return await project_1.default.findById(id)
        .populate('owner', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        zulip_id: 1,
        batchEndDate: 1,
        batch: 1,
        image_path: 1,
    })
        .populate('collaborators', {
        first_name: 1,
        last_name: 1,
        rcId: 1,
        image_path: 1,
    })
        .populate('tags', {
        value: 1,
    });
};
/**
 * Creates a single project
 *
 * @param {IProject} project - object containing all of the project properties
 *
 * @return {Promise<IProject & mongoose.Document>} Promise containing the newly created project document from the database
 */
const createProject = async (project) => {
    const projectToSave = new project_1.default(project);
    const savedProject = await projectToSave.save();
    return savedProject;
};
/**
 * Updates a single project
 *
 * @param {string} id - The project's ID from the database
 * @param {IProject} project - Object containing all of the project properties including the fields to be updated
 *
 * @return {Promise<IProject & mongoose.Document> | null} Updated project document from the database or null if no project was updated
 */
const updateProject = async (id, project) => {
    const updatedProject = await project_1.default.findByIdAndUpdate(id, project, {
        new: true,
        runValidators: true,
    });
    await updatedProject.save();
    return updatedProject;
};
/**
 * Deletes a single project
 *
 * @param {string} id - the project's ID from the database
 *
 * @return {number | undefined } Count of deleted projects or undefined if no project was deleted
 */
const deleteProject = async (id) => {
    const project = project_1.default.findById(id).populate('owner', {
        ownedProjects: 1,
        _id: 1,
    });
    return await project_1.default.deleteOne(project);
};
exports.default = {
    getAllProjects,
    getProjectsByStatus,
    getProjectsByUser,
    getProjectsByTags,
    getProjectsByUserAndTags,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
};
