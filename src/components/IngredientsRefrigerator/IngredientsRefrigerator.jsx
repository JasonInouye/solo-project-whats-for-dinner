import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function IngredientsRefrigerator() {
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.dow);
  const [heading, setHeading] = useState("Weekly Schedule");

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: "GET_REFRIGERATOR" });
  }, []);

  return (
    <>
      <div>IngredientsRefrigerator</div>
    </>
  );
}

export default IngredientsRefrigerator;
