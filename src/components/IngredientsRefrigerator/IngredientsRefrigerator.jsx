import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function IngredientsRefrigerator() {
  const dispatch = useDispatch();
  const refrigerator = useSelector((store) => store.ingredients);
  const [newRefrigeratorItem, setNewRefrigeratorItem] = useState('');

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: "GET_REFRIGERATOR" });
  }, []);

  const handleIngredientItem = (event) => {
    setNewRefrigeratorItem(event.target.value);
  }

  //console.log("this is the REFRIGERATOR details", refrigerator);
  const addIngredient = (event) => {
      event.preventDefault();
      console.log( 'Clicked SUBMIT Button');
      dispatch({ type: 'ADD_REF_ITEM', payload: newRefrigeratorItem });
  };

  return (
    <>
      <h1>Refrigerator Ingredients</h1>
      <form>
        <input type="text" placeholder="Add Ingredient" value={newRefrigeratorItem} onChange={handleIngredientItem}/>
        <button onClick={addIngredient}>Submit</button>
      </form>
      <div>
        <ul>
          {refrigerator.map((item) => {
            return (
              <div key={item.id}>
                <li>{item.ingredient}</li>
                <button onClick={(event) => dispatch({ type: "DELETE_INGREDIENT", payload: item.id })}>
                  Delete
                </button>
                <button>Update</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default IngredientsRefrigerator;
