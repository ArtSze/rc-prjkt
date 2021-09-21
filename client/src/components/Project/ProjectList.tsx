import React from 'react';
import { IProject } from '../../types/types';
import NoProjects from '../HelperComponents/NoProjects';

import StaticProject from './StaticProject';

interface ProjectsListProps {
    projects: IProject[];
}

const ProjectList = ({ projects }: ProjectsListProps): JSX.Element => {
    if (projects.length < 1) {
        return <NoProjects />;
    } else {
        return (
            <main className="project-list" data-testid="project-list">
                {projects.map((project: IProject) => {
                    return <StaticProject key={project._id.toString()} {...project} />;
                })}
            </main>
        );
    }
};

export default ProjectList;
