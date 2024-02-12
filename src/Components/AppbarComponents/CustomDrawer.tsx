import { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Drawer, Divider, ListItem, ListItemIcon, ListItemText, List, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EventIcon from '@mui/icons-material/Event';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import { Category } from '../../types';
import { drawerWidth } from '../../constants';


interface SidebarProps {
    changeSelectedCategory: (category: Category) => void;
}

interface MenuItem {
    text: Category;
    icon: JSX.Element;
}

const Sidebar: FC<SidebarProps> = ({ changeSelectedCategory }) => {
    const menuItems: MenuItem[] = [
        { text: 'Customers', icon: <AccountBoxIcon /> },
        { text: 'Trainings', icon: <DirectionsRunIcon /> },
        { text: 'Calendar', icon: <EventIcon /> },
        { text: 'Statistics', icon: <AnalyticsIcon /> },
    ];

    return (
        <List>
            {menuItems.map((item: MenuItem, index: number) => (
                <ListItem key={index} button onClick={(): void => changeSelectedCategory(item.text)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );
}

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface CustomDrawerProps {
    handleDrawerClose: () => void;
    isDrawerOpen: boolean;
    changeSelectedCategory: (category: Category) => void;
}

const CustomDrawer: FC<CustomDrawerProps> = ({ handleDrawerClose, isDrawerOpen, changeSelectedCategory }) => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={isDrawerOpen}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {<ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Sidebar changeSelectedCategory={changeSelectedCategory} />
        </Drawer>
    );
}

export default CustomDrawer;