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
	rcId: { type: Number, required: true, cast: false },
	first_name: { type: String },
	last_name: { type: String },
	zulip_id: { type: Number },
	image_path: { type: String },
	batch: { type: String }
});

// Export the model and return your IProject interface
export default mongoose.model<IUser>('User', UserSchema);
