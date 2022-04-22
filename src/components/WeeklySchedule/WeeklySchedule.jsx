import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function WeeklySchedule() {
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.dow);
  const [heading, setHeading] = useState('Weekly Schedule');

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_SCHEDULE' });
  }, []);

  //console.log("This is the schedule store data", schedule);

  return (
    <>
      <div>
        <h2>{heading}</h2>
      </div>
      <div>
        {schedule.map((schedule) => {
          return (
              <div key={schedule.id}>
                <p className="p-day">Day: {schedule.dow}</p>
                <p key={schedule.spoon_id}>{schedule.recipe_name}</p>
                <button onClick={(event) => dispatch({ type:'DELETE_SCHEDULE_RECIPE', payload: schedule.id })}>Delete</button>
              </div>
          );
        })}
      </div>
    </>
  );
}

export default WeeklySchedule;
