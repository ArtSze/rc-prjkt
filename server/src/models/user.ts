import mongoose, { Schema, Types } from 'mongoose';

export interface IUser {
	ownedPosts: Array<Types.ObjectId>;
	collabPosts: Array<Types.ObjectId>;
}

const UserSchema = new Schema<IUser>({
	ownedPosts: {
		type: [Schema.Types.ObjectId],
		ref: 'Post',
		default: undefined,
	},
	collabPosts: {
		type: [Schema.Types.ObjectId],
		ref: 'Post',
		default: undefined,
	},
});

// Export the model and return your IPost interface
export default mongoose.model<IUser>('User', UserSchema);
