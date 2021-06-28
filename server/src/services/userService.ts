import User from '../models/user';
import { IUserFromRCAPI } from '../types';

const getAllUsers = async () => {
	return await User.find({})
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

const getUser = async (rcId: number) => {
	return await User.find({ rcId: rcId })
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

const createUser = async (userData: IUserFromRCAPI) => {
	const user = await new User({
		ownedProjects: [],
		collabProjects: [],
		...userData,
	});
	const saved_user = await user.save();
	return saved_user;
};

export default { getAllUsers, getUser, createUser };
