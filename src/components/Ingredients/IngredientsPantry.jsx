import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function IngredientsPantry() {
  const dispatch = useDispatch();
  const pantry = useSelector((store) => store.ingredients);
  const history = useHistory();
  const [newPantryItem, setNewPantryItem] = useState({
    ingredient: '',
    location: 'Pantry',
  });

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_PANTRY' });
  }, []);

  const handleIngredientItem = (event) => {
    setNewPantryItem({ ...newPantryItem, ingredient: event.target.value });
  };

  const addIngredient = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_PANTRY_ITEM', payload: newPantryItem });
    setNewPantryItem({ ingredient: '', location: 'Pantry' });
  };

  const handleEdit = (item) => {
    dispatch({ type: 'SET_EDIT_INGREDIENT', payload: item });
    history.push(`/edit/${item.id}`);
  };

  return (
    <div className='main-container'>
      <h1>Pantry Ingredients</h1>
      <form>
        <input
          type='text'
          placeholder='Add Ingredient'
          value={newPantryItem.ingredient}
          onChange={handleIngredientItem}
        />
        <button onClick={addIngredient}>Submit</button>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pantry.map((item) => {
              return (
                <div>
                  <tr key={item.id}>
                    <td>{item.ingredient}</td>
                    <td>
                      <button
                        onClick={(event) =>
                          dispatch({
                            type: 'DELETE_PANTRY',
                            payload: item.id,
                          })
                        }
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    </td>
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IngredientsPantry;
