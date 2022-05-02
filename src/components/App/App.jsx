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
              <SideBar />

              <MainContainer />
            </Stack>

            <WeeklySchedule />

            {/* <Footer /> */}
          </body>
        </div>
      </Router>
    </Box>
  );
}

export default App;
