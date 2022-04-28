import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

function IngredientsRefrigerator() {
  const dispatch = useDispatch();
  const refrigerator = useSelector((store) => store.ingredients);
  const history = useHistory();
  const [newRefrigeratorItem, setNewRefrigeratorItem] = useState({ ingredient: '', location: 'Refrigerator' });

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: "GET_REFRIGERATOR" });
  }, []);

  const handleIngredientItem = (event) => {
    setNewRefrigeratorItem({...newRefrigeratorItem, ingredient: event.target.value,});
  }

  const addIngredient = (event) => {
      event.preventDefault();
      dispatch({ type: 'ADD_REF_ITEM', payload: newRefrigeratorItem });
      setNewRefrigeratorItem({ ingredient:'', location:'Refrigerator' })
  };

  const handleEdit = (item) => {
      console.log( 'inside of handleEdit', item);
      dispatch({type: 'SET_EDIT_INGREDIENT', payload: item});
      history.push(`/edit/${item.id}`);
  }

  return (
    <div className="main-container">
      <h1>Refrigerator Ingredients</h1>
      <form>
        <input type="text" placeholder="Add Ingredient" value={newRefrigeratorItem.ingredient} onChange={handleIngredientItem}/>
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
                <button onClick={() => handleEdit(item)}>Edit</button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default IngredientsRefrigerator;
