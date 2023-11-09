import './App.css';

import Box from '@mui/material/Box';
import React from 'react';

import CustomAppBar from './Components/AppbarComponents/CustomAppBar';
import CustomDrawer from './Components/AppbarComponents/CustomDrawer';
import MainContent from './Components/AppbarComponents/MainContent';

function App() {
  const [selectedCategory, setSelectedCategory] = React.useState('Customers');

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const changeSelectedCategory = (text) => {
    setSelectedCategory(text);
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CustomAppBar handleDrawerOpen={handleDrawerOpen} isDrawerOpen={isDrawerOpen} />
        <CustomDrawer changeSelectedCategory={changeSelectedCategory} handleDrawerClose={handleDrawerClose} isDrawerOpen={isDrawerOpen} />
        <MainContent isDrawerOpen={isDrawerOpen} selectedCategory={selectedCategory} />
      </Box>
    </div>
  );
}

export default App;
