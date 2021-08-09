import { ObjectId } from 'mongoose';

export interface ICollaborator {
    _id: ObjectId;
    first_name: string;
    last_name: string;
    rcId: number;
    image_path: string;
}

export interface IOwner extends ICollaborator {
    zulip_id: number;
    batch: string;
    batchEndDate: Date;
}

export interface IProject {
    _id: ObjectId;
    title: string;
    description: string;
    githubLink: string;
    owner: IOwner;
    collaborators: ICollaborator[];
    tags: ITag[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProjectOwnerCheck extends IProject {
    isOwner: boolean;
}

export interface ITag {
    _id: ObjectId;
    value: string;
}

export interface IProjectEdit {
    _id: ObjectId;
    title: string;
    description: string;
    githubLink: string;
    owner: IOwner;
    collaborators: ICollaborator[];
    tags: ITagEdit[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITagEdit {
    _id?: ObjectId;
    value: string;
}

export interface IOption<T> {
    value: T;
    label: string;
}

export type ITagOptions = Array<IOption<ITag>>;
export type IUserOptions = Array<IOption<IUser>>;

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

export enum SortMethods {
    'Last Updated' = 'last updated',
    'First Updated' = 'first updated',
    'Last Created' = 'last created',
    'First Created' = 'first created',
    'Latest Batch' = 'latest batch',
    'Oldest Batch' = 'oldest batch',
}
