import React, { FC } from 'react';

import { styled } from '@mui/material/styles';

import { Toolbar, IconButton, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from '../../constants';

interface AppBarProps extends MuiAppBarProps {
    isDrawerOpen?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'isDrawerOpen',
})<AppBarProps>(({ theme, isDrawerOpen }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isDrawerOpen && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface CustomAppBarProps {
    handleDrawerOpen: () => void;
    isDrawerOpen: boolean;
}

const CustomAppBar: FC<CustomAppBarProps> = ({ handleDrawerOpen, isDrawerOpen }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                    Personal Trainer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default CustomAppBar;