import { Types } from 'mongoose';
import { IProject } from './models/project';
import { IUser } from './models/user';

export interface IUserWithMongooseID extends IUser {
	_id?: string;
}

export interface IProjectWithMongooseID extends IProject {
	_id?: Types.ObjectId;
}

export interface IProjectFromClient {
	title: string;
	description: string;
	githubLink: string;
	owner: Types.ObjectId | string;
	collaborators: Array<Types.ObjectId>;
	tags: Array<Types.ObjectId>;
	active: boolean;
}

declare module 'express-session' {
	interface Session {
		user: IUserWithMongooseID;
	}
}

export interface IUserFromRCAPI {
	rcId: number;
	first_name: string;
	last_name: string;
	zulip_id: number;
	image_path: string;
    batchEndDate: Date;
	batch: string;
}

export interface IProfilefromRCAPI {
	id: number;
	first_name: string;
	last_name: string;
	zulip_id: number;
	image_path: string;
	stints: Array<Stint>;
}

export interface Stint {
    end_date: string;
	batch: Batch;
}

export interface Batch {
	short_name: string;
}
