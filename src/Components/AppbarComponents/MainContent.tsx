import React, { FC } from 'react';

import { styled } from '@mui/material/styles';

import { DrawerHeader } from './CustomDrawer';

import TrainingList from '../TrainingList'
import CustomerList from '../Customerlist';
import Calendar from '../Calendar';
import Statistics from '../Statistics';

import { drawerWidth } from '../../constants';
import { Category } from '../../types';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'isDrawerOpen' })<{
    isDrawerOpen?: boolean;
}>(({ theme, isDrawerOpen }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(isDrawerOpen && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}),
);

interface MainContentProps {
    isDrawerOpen: boolean;
    selectedCategory: Category;
}

const MainContent: FC<MainContentProps> = ({ isDrawerOpen, selectedCategory }) => {
    return (
        <Main isDrawerOpen={isDrawerOpen}>
            <DrawerHeader />
            {selectedCategory === 'Customers' && <CustomerList />}
            {selectedCategory === 'Trainings' && <TrainingList />}
            {selectedCategory === 'Calendar' && <Calendar />}
            {selectedCategory === 'Statistics' && <Statistics />}
        </Main>
    );
}

export default MainContent;