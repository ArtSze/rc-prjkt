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
<<<<<<< HEAD
	title: { type: String, required: true, maxLength: 160 },
	description: {
		type: String,
		minLength: 20,
		maxLength: 480,
	},
=======

	title: { type: String, unique: true, maxLength: 160 },
	description: { type: String, minLength: 20, maxLength: 480 },
>>>>>>> bc3ecfd5780fbb8e2c475b9c440e543c56447702
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
