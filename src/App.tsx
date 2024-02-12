import { FC, useState } from 'react';

import { Box } from "@mui/material";

import CustomAppBar from './Components/AppbarComponents/CustomAppBar';
import CustomDrawer from './Components/AppbarComponents/CustomDrawer';
import MainContent from './Components/AppbarComponents/MainContent';

import { Category } from './types';

const App: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Customers');

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDrawerOpen = (): void => {
    setIsDrawerOpen(true);
  }

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
  }

  const changeSelectedCategory = (category: Category): void => {
    setSelectedCategory(category);
  }

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
