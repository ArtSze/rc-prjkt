import { IUser } from './models/user';

declare module 'express-session' {
	interface Session {
		user: IUser;
	}
}

export interface IUserFromRCAPI {
	id: number;
	first_name: string;
	last_name: string;
	zulip_id: number;
	image_path: string;
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
	batch: Batch;
}

export interface Batch {
	short_name: string;
}
