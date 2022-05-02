import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Switch } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Box, Stack } from '@mui/material';
import SideBar from '../SideBar/SideBar';
import WeeklySchedule from '../WeeklySchedule/WeeklySchedule';
import MainContainer from '../MainContainer/MainContainer';

function OuterContainer() {
  return (
    <Box flex={8} p={2}>
      <Switch>
        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
        <Redirect exact from='/' to='/home' />

        {/* Visiting localhost:3000/about will show the about page. */}

        {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

        <Stack direction='row' spacing={3} justifyContent='space-between'>
          <ProtectedRoute>
            <SideBar />
          </ProtectedRoute>

          <MainContainer />
        </Stack>

          

      </Switch>
    </Box>
  );
}

export default OuterContainer;
