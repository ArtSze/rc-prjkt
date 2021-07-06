import mongoose, { Schema } from 'mongoose';

export interface ITag {
	value: string;
}

const TagSchema = new Schema<ITag>({
	value: { type: String, required: true },
});

export default mongoose.model<ITag>('Tag', TagSchema);
