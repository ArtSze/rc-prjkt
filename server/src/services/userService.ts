import User, { IUser } from '../models/user';
import { IUserFromRCAPI } from '../types';

const getAllUsers = async (): Promise<Array<IUser | null>> => {
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

const getUser = async (id: number): Promise<IUser | null> => {
	return await User.findOne({ rcId: id })
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

const createUser = async (userData: IUserFromRCAPI): Promise<IUser> => {
	return await new User({
		ownedProjects: [],
		collabProjects: [],
		rcId: userData.id,
		first_name: userData.first_name,
		last_name: userData.last_name,
		zulip_id: userData.zulip_id,
		image_path: userData.image_path,
		batch: userData.batch,
	});
};

export default { getAllUsers, getUser, createUser };
