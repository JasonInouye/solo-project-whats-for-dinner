import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

function IngredientsSpices() {
  const dispatch = useDispatch();
  const spices = useSelector((store) => store.ingredients);
  const history = useHistory();
  const [newSpicesItem, setNewSpicesItem] = useState({ ingredient: '', location: 'Spices' });

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_SPICES' });
  }, []);

  const handleIngredientItem = (event) => {
    setNewSpicesItem({...newSpicesItem, ingredient: event.target.value,});
  }

  const addIngredient = (event) => {
      event.preventDefault();
      dispatch({ type: 'ADD_SPICES_ITEM', payload: newSpicesItem });
      setNewSpicesItem({ ingredient:'', location:'Spices' })
  };

  const handleEdit = (item) => {
      console.log( 'inside of handleEdit', item);
      dispatch({type: 'SET_EDIT_INGREDIENT', payload: item});
      history.push(`/edit/${item.id}`);
  }

  return (
    <>
      <h1>Spices Ingredients</h1>
      <form>
        <input type="text" placeholder="Add Ingredient" value={newSpicesItem.ingredient} onChange={handleIngredientItem}/>
        <button onClick={addIngredient}>Submit</button>
      </form>
      <div>
        <ul>
          {spices.map((item) => {
            return (
              <div key={item.id}>
                <li>{item.ingredient}</li>
                <button onClick={(event) => dispatch({ type: 'DELETE_SPICE', payload: item.id })}>
                  Delete
                </button>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default IngredientsSpices;
