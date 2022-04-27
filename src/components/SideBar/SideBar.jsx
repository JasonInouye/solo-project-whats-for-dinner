import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Inventory, Kitchen, MenuBook, Save, Search } from '@mui/icons-material';

function SideBar() {
  return (
    <Box bgcolor='red' flex={1} p={2}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Save />
            </ListItemIcon>
            <ListItemText primary='Saved Recipes' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary='Stock Search' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary='Search' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary='Weekly Menu' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Kitchen />
            </ListItemIcon>
            <ListItemText primary='Ingredients' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default SideBar;
