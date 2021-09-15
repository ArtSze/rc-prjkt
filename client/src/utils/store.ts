import create from 'zustand';
import { ITag, IUser } from '../types/types';
import { StatusChoices, TTagFilter, TOwnerFilter, SortMethods } from '../types/filterTypes';

export interface AppState {
    statusFilter: StatusChoices;
    sortFilter: SortMethods;
    tagFilter: TTagFilter;
    ownerFilter: TOwnerFilter;
    addForm: boolean;
    allProjects: boolean;
    setStatusFilter: (status: StatusChoices) => void;
    setSortFilter: (sort: SortMethods) => void;
    setTagFilter: (tags: ITag['value'][] | undefined) => void;
    setOwnerFilter: (rcId: IUser['rcId'] | undefined) => void;
    setAllProjects: (allProjects: boolean) => void;
}
export const useStore = create<AppState>((set) => ({
    statusFilter: StatusChoices['Active'],
    sortFilter: SortMethods['Last Updated'],
    tagFilter: undefined,
    ownerFilter: undefined,
    addForm: false,
    allProjects: true,
    setStatusFilter: (status) => set({ statusFilter: status }),
    setSortFilter: (sort) => set({ sortFilter: sort }),
    setTagFilter: (tags) => set({ tagFilter: tags }),
    setOwnerFilter: (rcId) => {
        set({
            ownerFilter: rcId,
        });
    },
    setAllProjects: (allProjects) => set({ allProjects }),
}));
