import Project, { IProject } from '../models/project';

export const getProjects = async (): Promise<Array<IProject>> => {
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

export const getProject = async (id: string): Promise<IProject | null> => {
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

export const createProject = async (project: IProject): Promise<IProject> => {
	// logic for getting current logged-in user and ensuring you are authorized user...
	const projectToSave = new Project(project);
	const savedProject = await projectToSave.save();
	// logic for adding savedProject to logged-in user's ownedProjects property
	// save logged-in user
	return savedProject;
};

export const deleteProject = async (
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

export const updateProject = async (id: string, project: IProject) => {
	// logic for getting current logged-in user and ensuring you are authorized user...
	return await Project.findByIdAndUpdate(id, project, { new: true });
};
