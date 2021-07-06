import Project, { IProject } from '../models/project';
import userService from './userService';

/**
 * Returns all of the projects in the database
 *
 * @return {Promise<Array<IProject>>} Promise containing an array of projects
 */
const getAllProjects = async () => {
	return await Project.find({})
		.populate('owner', {
			first_name: 1,
			last_name: 1,
			zulip_id: 1,
			batchEndDate: 1,
			batch: 1,
			image_path: 1,
		})
		.populate('collaborators', {
			first_name: 1,
			last_name: 1,
		})
		.populate('tags', {
			value: 1,
		});
};

/**
 * Returns all of the active projects in the database
 *
 * @remark
 * Active projects have a property of `active` that returns `true`
 *
 *
 * @return {Promise<(IProject & mongoose.Document)[]>} Promise containing an array of projects
 */
const getAllActiveProjects = async () => {
	return await Project.find({ active: true })
		.populate('owner', {
			first_name: 1,
			last_name: 1,
			zulip_id: 1,
			batchEndDate: 1,
			batch: 1,
			image_path: 1,
		})
		.populate('collaborators', {
			first_name: 1,
			last_name: 1,
		})
		.populate('tags', {
			value: 1,
		});
};

/**
 * Returns all of the inactive projects in the database
 *
 * @remark
 * Inactive projects have a property of `active` that returns `false`
 *
 *
 * @return {Promise<(IProject & mongoose.Document)[]>} Promise containing an array of projects
 */
const getAllInactiveProjects = async () => {
	return await Project.find({ active: false })
		.populate('owner', {
			first_name: 1,
			last_name: 1,
			zulip_id: 1,
			batchEndDate: 1,
			batch: 1,
			image_path: 1,
		})
		.populate('collaborators', {
			first_name: 1,
			last_name: 1,
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
const getSingleProject = async (id: string) => {
	return await Project.findById(id)
		.populate('owner', {
			first_name: 1,
			last_name: 1,
			zulip_id: 1,
			batchEndDate: 1,
			batch: 1,
			image_path: 1,
		})
		.populate('collaborators', {
			first_name: 1,
			last_name: 1,
		})
		.populate('tags', {
			value: 1,
		});
};

/**
 * Returns all projects in the database belonging to a specific user
 *
 * @param {string} rcId - the user's ID from the database
 *
 * @return {Promise<Array<IProject>> | null } Promise containing an array of projects or null if no project is found
 */
const getProjectsByUser = async (rcId: number) => {
	const user = await userService.getUser(rcId);
	return await Project.find({ owner: user?._id })
		.populate('owner', {
			first_name: 1,
			last_name: 1,
			zulip_id: 1,
			batchEndDate: 1,
			batch: 1,
			image_path: 1,
		})
		.populate('collaborators', {
			first_name: 1,
			last_name: 1,
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
const createProject = async (project: IProject) => {
	const projectToSave = new Project(project);
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
const updateProject = async (id: string, project: IProject) => {
	const updatedProject = await Project.findByIdAndUpdate(id, project, {
		new: true,
		runValidators: true,
	});
	await updatedProject!.save();
	return updatedProject;
};

/**
 * Deletes a single project
 *
 * @param {string} id - the project's ID from the database
 *
 * @return {number | undefined } Count of deleted projects or undefined if no project was deleted
 */
const deleteProject = async (id: string) => {
	const project = Project.findById(id).populate('owner', {
		ownedProjects: 1,
		_id: 1,
	});
	return await Project.deleteOne(project);
};

export default {
	getAllProjects,
	getAllActiveProjects,
	getAllInactiveProjects,
	getProjectsByUser,
	getSingleProject,
	createProject,
	updateProject,
	deleteProject,
};
