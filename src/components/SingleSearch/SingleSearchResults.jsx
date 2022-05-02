import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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

function SingleSearchResults() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [dow, setDow] = useState('');
  const dowList = useSelector((store) => store.dow);
  const MySwal = withReactContent(Swal);
  const [favoriteItem, setFavoriteItem] = useState({
    spoon_id: 0,
    recipe_name: '',
    recipe_image: '',
  });

  const searchResults = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&query=${name}`
      // `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.id}/information?rapidapi-key=${process.env.REACT_RAPID_API_KEY}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    searchResults(params.searchItem);
    dispatch({ type: 'GET_DOW' });
  }, [params.searchItem]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleFavorite = (item) => {
    let favoriteItem = {
      spoon_id: item.id,
      recipe_name: item.title,
      recipe_image: item.image,
    };
    dispatch({ type: 'ADD_FAVORITE', payload: favoriteItem });
    MySwal.fire({title: `Recipe added to favorites!`,confirmButtonColor: "#FF0000"});
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

  return (
    <div className='main-container'>
      <Grid container spacing={6}>
        {searchedRecipes.map((item) => {
          return (
            <div key={item.id}>
              <Grid item xs={12} md={12}>
                <Card sx={{ width: 345, margin: 8, borderRadius: '16px' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                        WFD
                      </Avatar>
                    }
                    titleTypographyProps={{
                      fontWeight: 'Bold',
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
