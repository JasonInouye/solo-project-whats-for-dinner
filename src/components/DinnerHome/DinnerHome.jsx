import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
} from '@mui/material';

function DinnerHomeTwo() {
  const [expanded, setExpanded] = React.useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

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

  return (
    <div className='main-container'>
      <h1>My Saved Recipes</h1>
      <Grid container spacing={6}>
        {favorite.map((favoriteRecipe) => {
          return (
            <div key={favoriteRecipe.id}>
              <Grid item xs={12} md={12}>
                <Card sx={{ maxWidth: 345, margin: 8 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                        WFD
                      </Avatar>
                    }
                    title={favoriteRecipe.recipe_name}
                  />
                  <Link to={'/recipeDetails/' + favoriteRecipe.spoon_id}>
                    <CardMedia
                      component='img'
                      height='20%'
                      image={favoriteRecipe.recipe_image}
                      alt='Paella dish'
                    />
                  </Link>
                  <CardActions disableSpacing>
                    <IconButton aria-label='add to favorites'>
                      <FavoriteIcon />
                    </IconButton>
                    <Button onClick={handleClickOpen}>Select a Day</Button>
                    <Dialog
                      disableEscapeKeyDown
                      open={open}
                      onClose={handleClose}
                      sx={{ backgroundColor: 'transparent' }}
                    >
                      <DialogTitle>Choose a Day</DialogTitle>
                      <DialogContent>
                        <Box
                          component='form'
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            backgroundColor: 'transparent',
                          }}
                        >
                          <FormControl
                            sx={{
                              m: 5,
                              minWidth: 240,
                              backgroundColor: 'transparent',
                            }}
                          >
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
                  </CardActions>
                </Card>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}

export default DinnerHomeTwo;
