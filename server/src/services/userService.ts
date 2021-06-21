import User, { IUser } from '../models/user';

const getUser = async (id: string): Promise<IUser | null> => {
	return await User.findById(id)
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
		});
};

const createUser = async (rcId: string): Promise<IUser> => {
	return await new User({
		rcId,
		ownedProjects: [],
		collabProjects: [],
	});
};

export default { getUser, createUser };
