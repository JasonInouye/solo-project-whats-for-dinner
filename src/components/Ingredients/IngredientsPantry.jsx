import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { red } from '@mui/material/colors';

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
      <Typography variant="h5">Pantry</Typography>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          id='outlined-search'
          label='Add Ingredient'
          type='search'
          value={newPantryItem.ingredient}
          onChange={handleIngredientItem}
          sx={{ mt:2, mb:2 }}
        />
      </Box>
      <Button variant="contained" endIcon={<Add />} onClick={addIngredient} color="error" size="small">
        Submit
      </Button>
      <TableContainer component={Paper} sx={{ mt: 5, width: 700 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='Left' sx={{ width: 100 }}>
                Ingredients
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantry.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Typography>{item.ingredient}</Typography>
                  <Button
                    size='small'
                    onClick={(event) =>
                      dispatch({
                        type: 'DELETE_PANTRY',
                        payload: item.id,
                      })
                    }
                  >
                    Delete
                  </Button>
                  <Button size='small' onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default IngredientsPantry;
