import mongoose, { Schema, Types } from 'mongoose';

export interface IUser {
	ownedProjects: Array<Types.ObjectId>;
	collabProjects: Array<Types.ObjectId>;
	rcId: number;
	first_name: string;
	last_name: string;
	zulip_id: number;
	image_path: string;
	batch: string;
}

const UserSchema = new Schema<IUser>({
	ownedProjects: {
		type: [Schema.Types.ObjectId],
		ref: 'Project',
	},
	collabProjects: {
		type: [Schema.Types.ObjectId],
		ref: 'Project',
	},
	rcId: Number,
	first_name: String,
	last_name: String,
	zulip_id: Number,
	image_path: String,
	batch: String,
});

// Export the model and return your IProject interface
export default mongoose.model<IUser>('User', UserSchema);
