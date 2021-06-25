import mongoose, { Schema, Types } from 'mongoose';

export interface IProject {
	title: string;
	description: string;
	githubLink: string;
	owner: Types.ObjectId;
	collaborators: Array<Types.ObjectId>;
	tags: Array<Types.ObjectId>;
	active: boolean;
}

const ProjectSchema = new Schema<IProject>({
	title: { type: String, required: true, maxLength: 160 },
	description: {
		type: String,
		minLength: 20,
		maxLength: 480,
	},
	githubLink: { type: String },
	owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	collaborators: {
		type: [Schema.Types.ObjectId],
		ref: 'User',
	},
	tags: { type: [Schema.Types.ObjectId], ref: 'Tag' },
	active: { type: Boolean, required: true },
});

// Export the model and return your IProject interface
export default mongoose.model<IProject>('Project', ProjectSchema);
