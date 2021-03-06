import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import swal from 'sweetalert';
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

function SingleSearchResults() {
  const searchRecipes = useSelector((store) => store.searchData);
  //const [searchRecipes, setSearchRecipes] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [dow, setDow] = useState('');
  const dowList = useSelector((store) => store.dow);
  const [favoriteItem, setFavoriteItem] = useState({
    spoon_id: 0,
    recipe_name: '',
    recipe_image: '',
  });

  // const searchResults = async (name) => {
  //   const data = await fetch(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
  //     //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&query=${name}`
  //     //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_THIRD_API_KEY}&query=${name}`
  //   );
  //   const recipes = await data.json();
  //   setSearchRecipes(recipes.results);
  // };

  //console.log('does this work before use effect', params?.searchItem);
  // useEffect(() => {
  //   //console.log( 'The search item is', params.searchItem);
  //   searchResults(params.searchItem); //this is the original line
  //   //handleSingleSearch(params.searchItem)
  //   //console.log('can i log in here');
  //   //dispatch({ type:'GET_SEARCH', payload: params.searchItem})
  //   dispatch({ type: 'GET_DOW' });
  // }, [params.searchItem]);

  // useEffect(() => {
  //   handleSingleSearch();
  //   //dispatch({ type:'GET_SINGLE', payload: params.searchItem})
  // }, [[params.searchItem]])

  useEffect(() => {
    handleSingleSearch(params?.searchItem);
  }, [params?.searchItem]);

  // this is the new code to remove if we need to revert back

  const handleSingleSearch = (searchItem) => {
    dispatch({ type:'GET_SINGLE', payload: searchItem})
  }

  const handleFavorite = (item) => {
    let favoriteItem = {
      spoon_id: item.id,
      recipe_name: item.title,
      recipe_image: item.image,
    };
    dispatch({ type: 'ADD_FAVORITE', payload: favoriteItem });
    swal({title: `Recipe added to favorites!`,dangerMode: true});
    setFavoriteItem({ id: 0, image: '', title: '' });
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const saveDow = (favoriteRecipe) => {
    let addDow = {
      id: favoriteRecipe.id,
      spoon_id: favoriteRecipe.spoon_id,
      dow: dow,
    };
    dispatch({ type: 'SET_MENU_DOW', payload: addDow });
    setOpen(false);
  };

  console.log('This is the value before return', params.searchItem );

  return (
    <div className='main-container'>
      <Grid container spacing={6}>
        {searchRecipes.map((item) => {
          return (
            <div key={item.id}>
              <Grid item xs={12} md={12}>
                <Card sx={{ width: 375, margin: 8, borderRadius: '16px' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                        WFD
                      </Avatar>
                    }
                    titleTypographyProps={{
                      fontWeight: 'Bold',
                      fontSize: 18,
                    }}
                    title={item.title}
                  />
                  <Link to={'/recipeDetails/' + item.id}>
                    <CardMedia
                      component='img'
                      height='20%'
                      image={item.image}
                      alt='Paella dish'
                    />
                  </Link>
                  <CardActions disableSpacing>
                    <Button onClick={() => handleFavorite(item)}>
                      Favorite Recipe
                    </Button>
                    {/* <Button onClick={handleClickOpen}>Select a Day</Button> */}
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

export default SingleSearchResults;
