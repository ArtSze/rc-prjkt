import Project, { IProject } from '../models/project';
import { IProjectWithMongooseID } from '../types';

const getAllProjects = async (): Promise<Array<IProject>> => {
	return await Project.find({})
		.populate('owner', {
			ownedProjects: 1,
			collabProjects: 1,
		})
		.populate('collaborators', {
			ownedProjects: 1,
			collabProjects: 1,
		})
		.populate('tags', {
			category: 1,
			value: 1,
		});
};

const getSingleProject = async (id: string): Promise<IProject | null> => {
	return await Project.findById(id)
		.populate('owner', {
			ownedProjects: 1,
			collabProjects: 1,
			_id: 1,
		})
		.populate('collaborators', {
			ownedProjects: 1,
			collabProjects: 1,
		})
		.populate('tags', {
			category: 1,
			value: 1,
		});
};

const createProject = async (
	project: IProject
): Promise<IProjectWithMongooseID> => {
	const projectToSave = new Project(project);
	const savedProject = await projectToSave.save();
	return savedProject;
};

const updateProject = async (id: string, project: IProject) => {
	const updatedProject = await Project.findByIdAndUpdate(id, project, {
		new: true,
	});
	await updatedProject!.save();
	return updatedProject;
};

const deleteProject = async (
	id: string
): Promise<
	{ ok?: number | undefined; n?: number | undefined } & {
		deletedCount?: number | undefined;
	}
> => {
	const project = Project.findById(id).populate('owner', {
		ownedProjects: 1,
		_id: 1,
	});
	return await Project.deleteOne(project);
};

export default {
	getAllProjects,
	getSingleProject,
	createProject,
	updateProject,
	deleteProject,
};
