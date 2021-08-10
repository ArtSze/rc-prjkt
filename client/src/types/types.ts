import { ObjectId } from 'mongoose';

export interface IUser {
    _id: ObjectId;
    rcId: number;
    first_name: string;
    last_name: string;
    zulip_id: number;
    image_path: string;
    batchEndDate: Date;
    batch: string;
    ownedProjects: Array<IProject>;
    collabProjects: Array<IProject>;
}

type ICollaborator = Pick<IUser, '_id' | 'first_name' | 'last_name' | 'rcId' | 'image_path'>;

export interface IProject {
    _id: ObjectId;
    title: string;
    description: string;
    githubLink: string;
    owner: IUser;
    collaborators: ICollaborator[];
    tags: ITag[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProjectOwnerCheck extends IProject {
    isOwner: boolean;
}

export interface IProjectEdit {
    _id: ObjectId;
    title: string;
    description: string;
    githubLink: string;
    owner: IUser;
    collaborators: ICollaborator[];
    tags: ITagNew[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITagNew {
    _id?: ObjectId;
    value: string;
}

export interface ITag {
    _id: ObjectId;
    value: string;
}

export interface IOption<T> {
    value: T;
    label: string;
}
