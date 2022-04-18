import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

function DinnerHome() {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.favorite);
  const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_FAVORITES' });
  }, []);

  console.log( 'Logging the GET', favorites);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default DinnerHome;