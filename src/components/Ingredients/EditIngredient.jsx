import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';

function EditIngredient() {
  const dispatch = useDispatch();
  const history = useHistory();
  const editIngredient = useSelector((store) => store.editIngredient);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT_INGREDIENT', payload: id });
  }, [id]);

  console.log('Edit Ingredient', editIngredient);

  function handleChange(event, property) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: property, value: event.target.value },
    });
  }

  const handleSubmit = () => {
    event.preventDefault();
    console.log('this is the ingredient', editIngredient.ingredient);

    axios
      .put(`/api/ingredients/${editIngredient.id}`, {
        ingredient: editIngredient.ingredient,
      })
      .then((response) => {
        // clean up reducer data
        dispatch({ type: 'EDIT_CLEAR' });
        // refresh will happen with useEffect on Home
        // location is one of the three ingredient locations
        // allows us to reuse the edit function for all three locations
        history.push(`/ingredients/${editIngredient.location}`); // back to list
      })
      .catch((error) => {
        console.log('error on PUT: ', error);
      });
  };

  return (
    <div className='main-container'>
      <Typography variant="h4">Edit Ingredient</Typography>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          id='outlined-search'
          label='Ingredient'
          onChange={(event) => handleChange(event, 'ingredient')}
          value={editIngredient.ingredient}
          sx={{ mt: 2, mb: 2, width: 400 }}
        />
      </Box>
      <Button
        variant='contained'
        onClick={handleSubmit}
        color='error'
      >
        Update Ingredient
      </Button>
    </div>
  );
}

export default EditIngredient;
