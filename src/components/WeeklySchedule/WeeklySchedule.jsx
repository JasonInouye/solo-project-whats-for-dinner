import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function WeeklySchedule(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Weekly Schedule');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default WeeklySchedule;