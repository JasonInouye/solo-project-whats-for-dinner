import { Delete, MenuBook, Remove } from '@mui/icons-material';
import {
  Box,
  Fab,
  Modal,
  Tooltip,
  styled,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

function WeeklySchedule() {
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.dow);
  const [heading, setHeading] = useState('Weekly Schedule');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_SCHEDULE' });
  }, []);

  return (
    <>
      <Tooltip
        onClick={(event) => setOpen(true)}
        title='Weekly Menu'
        sx={{ position: 'fixed', top: 80, right: { xs: 'calc(20%)', md: 90 } }}
      >
        <Fab bgcolor='red[500]' aria-label='add'>
          <MenuBook />
        </Fab>
      </Tooltip>
      <ProtectedRoute
        // logged in shows UserPage else shows LoginPage
        exact
        path='/schedule'
      >
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
      </ProtectedRoute>
    </>
  );
}

export default WeeklySchedule;
