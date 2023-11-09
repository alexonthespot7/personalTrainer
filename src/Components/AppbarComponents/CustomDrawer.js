import React from 'react';

import { styled } from '@mui/material/styles';

import { Drawer, Divider, ListItem, ListItemIcon, ListItemText, List, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EventIcon from '@mui/icons-material/Event';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const drawerWidth = 240;

const Sidebar = ({ changeSelectedCategory }) => {
    const menuItems = [
        { text: 'Customers', icon: <AccountBoxIcon /> },
        { text: 'Trainings', icon: <DirectionsRunIcon /> },
        { text: 'Calendar', icon: <EventIcon /> },
        { text: 'Statistics', icon: <AnalyticsIcon /> },
    ];

    return (
        <List>
            {menuItems.map((item, index) => (
                <ListItem key={index} button onClick={() => changeSelectedCategory(item.text)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );
};

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const CustomDrawer = ({ handleDrawerClose, isDrawerOpen, changeSelectedCategory }) => {
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
};

export default CustomDrawer;