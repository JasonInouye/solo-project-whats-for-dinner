import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
  Stack,
} from '@mui/material';

// const style = {
//   mt: 2,
//   width:{ sm: 200, md: 345 },
//   height:{ md: 500 },
//   padding: 2,
//   boxShadow: 6
// }


function DinnerHome() {
  const dispatch = useDispatch();
  const favorite = useSelector((store) => store.favorite);
  const dowList = useSelector((store) => store.dow);
  const [dow, setDow] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_FAVORITES' });
    dispatch({ type: 'GET_DOW' });
  }, []);

  //console.log( 'This is the DOW', dowList);

  const saveDow = (favoriteRecipe) => {
    console.log('CLICKED');
    let addDow = {
      id: favoriteRecipe.id,
      spoon_id: favoriteRecipe.spoon_id,
      dow: dow,
    };
    dispatch({ type: 'SET_MENU_DOW', payload: addDow });
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <Grid container spacing={3}>
      {favorite.map((favoriteRecipe) => {
        return (
          <div key={favoriteRecipe.id}>
            <Grid item xs={3}>
              <Card sx={{ maxWidth:1200}}>
                {/* <CardHeader title={favoriteRecipe.recipe_name} /> */}
                <Link to={'/recipeDetails/' + favoriteRecipe.spoon_id}>
                  <CardMedia
                    component='img'
                    height='240'
                    width='750'
                    image={favoriteRecipe.recipe_image}
                  />
                </Link>
                <CardContent>
                  {favoriteRecipe.recipe_name}
                  <Button onClick={handleClickOpen}>Select a Day</Button>
                  <Dialog
                    disableEscapeKeyDown
                    open={open}
                    onClose={handleClose}
                    sx={{ backgroundColor: 'transparent'}}
                  >
                    <DialogTitle>Choose a Day</DialogTitle>
                    <DialogContent>
                      <Box
                        component='form'
                        sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'transparent' }}
                      >
                        <FormControl sx={{ m: 5, minWidth: 240, backgroundColor: 'transparent' }}>
                          <InputLabel htmlFor='demo-dialog-native'>
                            Day
                          </InputLabel>
                          <Select
                            native
                            value={dow.dow}
                            onChange={(event) => setDow(event.target.value)}
                            input={
                              <OutlinedInput
                                label='Dow'
                                id='demo-dialog-native'
                              />
                            }
                          >
                            {dowList.map((dow) => {
                              return (
                                <option key={dow.id} value={dow.dow}>
                                  {dow.dow}
                                </option>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => saveDow(favoriteRecipe)}>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </CardContent>
              </Card>
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
}

export default DinnerHome;
