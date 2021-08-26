import React from 'react';
import AddFormModal from '../Project/form/AddFormModal';
import { FaHome, FaUser } from 'react-icons/fa';
import { Tab, Tabs } from '@material-ui/core';
import { useStore, AppState } from '../../utils/store';
import { useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../static/styles';
import { QueryParams, SortMethods } from '../../types/filterTypes';

interface NavProps {
    allProjects: boolean;
    setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
    setAllProjects: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavHome = ({ allProjects, setAllProjects, setParams }: NavProps): JSX.Element => {
    const classes = useStyles();

    const setOwnerFilter = useStore((state: AppState) => state.setOwnerFilter);
    const setTagFilter = useStore((state: AppState) => state.setTagFilter);

    const isSmallScreen = useMediaQuery('(max-width: 650px)');

    return (
        <div className={classes.appBarRight}>
            <AddFormModal />
            <Tabs value={allProjects ? 0 : 1} classes={{ indicator: classes.tallIndicator }}>
                <Tab
                    label={!isSmallScreen && 'All Projects'}
                    icon={isSmallScreen ? <FaHome /> : ''}
                    onClick={() => {
                        setAllProjects(true);
                        setParams({ status: true, sort: SortMethods['Last Updated'] });
                        setOwnerFilter(undefined);
                        setTagFilter(undefined);
                    }}
                />
                <Tab
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
