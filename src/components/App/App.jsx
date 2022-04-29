import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import SideBar from '../SideBar/SideBar';
import MainContainer from '../MainContainer/MainContainer';
import WeeklySchedule from '../WeeklySchedule/WeeklySchedule';
import './App.css';

import { Box, Fab, Grid, IconButton, Modal, Stack, styled, Tooltip, Typography } from '@mui/material';
import { Delete, MenuBook } from '@mui/icons-material';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

function App() {
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.dow);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState('Weekly Schedule');
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_SCHEDULE' });
  }, []);

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
            {/* <WeeklySchedule /> */}
            {/* <Footer /> */}
          </body>
          <Tooltip
            onClick={(event) => setOpen(true)}
            title='Weekly Menu'
            sx={{
              position: 'fixed',
              top: 80,
              right: { xs: 'calc(20%)', md: 90 },
            }}
          >
            <Fab bgcolor='red[500]' aria-label='add'>
              <MenuBook />
            </Fab>
          </Tooltip>
          <StyledModal
          open={open}
          onClose={(event) => setOpen(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box width={400} height={610} bgcolor='white' p={1} borderRadius={3}>
            <Typography variant='h6'>
              <h2>{heading}</h2>
            </Typography>
            <Box sx={{ mt:1 }}>
              {schedule.map((schedule) => {
                return (
                  <div key={schedule.id}>
                    <Typography variant='h6' sx={{ fontWeight: '500' }}>
                      {schedule.dow}
                    </Typography>
                    <Grid container>
                      <Grid item>
                        <Typography
                          key={schedule.spoon_id}
                          variant='subtitle2'
                          sx={{ fontWeight: 'Light', m: 1.5 }}
                        >
                          {schedule.recipe_name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label='delete'
                          onClick={(event) =>
                            dispatch({
                              type: 'DELETE_SCHEDULE_RECIPE',
                              payload: schedule.id,
                            })
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Box>
          </Box>
        </StyledModal>
        </div>
      </Router>
    </Box>
  );
}

export default App;
