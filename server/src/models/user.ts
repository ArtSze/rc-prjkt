import mongoose, { Schema, Types } from 'mongoose';

export interface IUser {
	ownedProjects: Array<Types.ObjectId>;
	collabProjects: Array<Types.ObjectId>;
	rcId: string;
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
	rcId: String,
});

// Export the model and return your IProject interface
export default mongoose.model<IUser>('User', UserSchema);
