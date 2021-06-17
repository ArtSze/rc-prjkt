import mongoose, { Schema, Types } from 'mongoose';

export interface IPost {
	title: string;
	description: string;
	githubLink: string;
	owner: Types.ObjectId;
	collaborators: Array<Types.ObjectId>;
	tags: Array<Types.ObjectId>;
	active: boolean;
}

const PostSchema = new Schema<IPost>({
	title: { type: String, required: true, unique: true },
	description: {
		type: String,
		required: true,
		minLength: 20,
		maxLength: 240,
	},
	githubLink: { type: String },
	owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	collaborators: {
		type: [Schema.Types.ObjectId],
		default: undefined,
	},
	tags: { type: [Schema.Types.ObjectId], ref: 'Tag', default: undefined },
	active: { type: Boolean, required: true },
});

// Export the model and return your IPost interface
export default mongoose.model<IPost>('Post', PostSchema);
