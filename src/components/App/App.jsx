import React, { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import SideBar from '../SideBar/SideBar';
import MainContainer from '../MainContainer/MainContainer';
import WeeklySchedule from '../WeeklySchedule/WeeklySchedule';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import './App.css';

import { Box, Stack } from '@mui/material';
import SideBarNo from '../SideBarNo/SideBarNo';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Box>
      <Router>
        <div className='bg-image'>
          <Nav />
          <body>
            <Stack direction='row' spacing={3} justifyContent='space-between'>
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <SideBar />
              ) : (
                // Otherwise, show the registration page
                <SideBarNo />
              )}

              <MainContainer />
            </Stack>
            {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <WeeklySchedule />
              ) : (
                // Otherwise, show the registration page
                <SideBarNo />
              )}
            {/* <Footer /> */}
          </body>
        </div>
      </Router>
    </Box>
  );
}

export default App;
