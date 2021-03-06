import React from 'react';
import AddFormModal from '../Project/form/AddFormModal';
import { FaHome, FaUser } from 'react-icons/fa';
import { Tab, Tabs } from '@material-ui/core';
import { useStore, AppState } from '../../utils/store';
import { useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../static/styles';
import { StatusChoices, QueryParams, SortMethods } from '../../types/filterTypes';

interface NavProps {
    setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
}

const NavHome = ({ setParams }: NavProps): JSX.Element => {
    const classes = useStyles();
    const setOwnerFilter = useStore((state: AppState) => state.setOwnerFilter);
    const setTagFilter = useStore((state: AppState) => state.setTagFilter);
    const setSortFilter = useStore((state: AppState) => state.setSortFilter);
    const setStatusFilter = useStore((state: AppState) => state.setStatusFilter);
    const allProjects = useStore((state: AppState) => state.allProjects);
    const setAllProjects = useStore((state: AppState) => state.setAllProjects);

    const isSmallScreen = useMediaQuery('(max-width: 650px)');

    return (
        <div className={classes.appBarRight}>
            <AddFormModal />
            <Tabs value={allProjects ? 0 : 1} classes={{ indicator: classes.tallIndicator }}>
                <Tab
                    data-testid="all-projects-tab"
                    label={!isSmallScreen && 'All Projects'}
                    icon={isSmallScreen ? <FaHome /> : ''}
                    onClick={() => {
                        setOwnerFilter(undefined);
                        setTagFilter(undefined);
                        setStatusFilter(StatusChoices['Active']);
                        setSortFilter(SortMethods['Last Updated']);
                        setParams({ status: true, sort: SortMethods['Last Updated'] });
                        setAllProjects(true);
                    }}
                />
                <Tab
                    data-testid="my-projects-tab"
                    label={!isSmallScreen && 'My Projects'}
                    icon={isSmallScreen ? <FaUser /> : ''}
                    onClick={() => {
                        setAllProjects(false);
                        setParams({ me: true, sort: SortMethods['Last Updated'] });
                    }}
                />
            </Tabs>
        </div>
    );
};

export default NavHome;
