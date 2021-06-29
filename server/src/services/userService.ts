import User from '../models/user';
import { IUserFromRCAPI } from '../utils/types';

/**
 * Retrieve all users in the database including their owned projects and collaborated projects
 * 
 * @return {Promise<(IUser & mongoose.Document)[]>} All users in the database
 */
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

/**
 * Retrieve a single user from the database including their owned projects and collaborated projects
 * 
 * @return {Promise<(IUser & mongoose.Document)>} A single user from the database
 */
const getUser = async (rcId: number) => {
	return await User.findOne({ rcId: rcId })
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

/**
 * Creates a new user in the database
 * 
 * @remarks Create user is called from the authentication router which provides an object from the RC API containing the user data based on their authentication token.
 * 
 * @param {IUserFromRCAPI} userData - An object containing user data from the RC API
 * 
 * @return {Promise<ITag & mongoose.Document>} Newly created tag document from the database
 */
const createUser = async (userData: IUserFromRCAPI) => {
	const user = new User({
		ownedProjects: [],
		collabProjects: [],
		...userData,
	});
	const savedUser = await user.save();
	return savedUser;
};

export default { getAllUsers, getUser, createUser };