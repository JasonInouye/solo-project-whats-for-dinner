import { MenuBook } from '@mui/icons-material';
import { Box, Fab, Modal, Tooltip, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const StyledModal = styled(Modal)({
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
})

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
      <Tooltip onClick ={event => setOpen(true)}
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
        onClose={event => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box width={400} height={480} bgcolor="white" p={3} borderRadius={3}>
          <div>
            <h2>{heading}</h2>
          </div>
          <div>
            {schedule.map((schedule) => {
              return (
                <div key={schedule.id}>
                  <p className='p-day'>Day: {schedule.dow}</p>
                  <p key={schedule.spoon_id}>{schedule.recipe_name}</p>
                  <button
                    onClick={(event) =>
                      dispatch({
                        type: 'DELETE_SCHEDULE_RECIPE',
                        payload: schedule.id,
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </Box>
      </StyledModal>
      </ProtectedRoute>
    </>
  );
}

export default WeeklySchedule;
