import mongoose, { Schema } from 'mongoose';

export enum ETagCategories {
	Category = 'category',
	Language = 'language',
	Library = 'library',
	CollaborationStyle = 'collaboration style',
}

export interface ITag {
	category: ETagCategories;
	value: string;
}

const TagSchema = new Schema<ITag>({
	category: { type: String, enum: ETagCategories, required: true },
	value: { type: String, required: true },
});

export default mongoose.model<ITag>('Tag', TagSchema);
