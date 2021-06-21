import Project, { IProject } from '../models/project';

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

const createProject = async (project: IProject): Promise<IProject> => {
	// logic for getting current logged-in user and ensuring you are authorized user...
	const projectToSave = new Project(project);
	const savedProject = await projectToSave.save();
	// logic for creating new Tag documents from project.tags property
	// logic for saving new Tag documents (maybe within map or forEach?)
	// logic for adding savedProject to logged-in user's ownedProjects property
	// save logged-in user
	return savedProject;
};

const updateProject = async (id: string, project: IProject) => {
	// logic for getting current logged-in user and ensuring you are authorized user...
	// logic for creating new Tag documents from project.tags property that don't currently exist
	// logic for saving new Tag documents (maybe within map or forEach?)
	return await Project.findByIdAndUpdate(id, project, { new: true });
};

const deleteProject = async (
	id: string
): Promise<
	{ ok?: number | undefined; n?: number | undefined } & {
		deletedCount?: number | undefined;
	}
> => {
	// logic for getting current logged-in user and ensuring you are authorized user...
	const project = Project.findById(id).populate('owner', {
		ownedProjects: 1,
		_id: 1,
	});
	// if project.owner._id === currentUser._id
	return await Project.deleteOne(project);
};

export default {
	getAllProjects,
	getSingleProject,
	createProject,
	updateProject,
	deleteProject,
};
