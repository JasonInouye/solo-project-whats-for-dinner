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
  Typography,
} from '@mui/material';

function StockSearchResults() {
  const [stockRecipes, setStockRecipes] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [dow, setDow] = useState('');
  const dowList = useSelector((store) => store.dow);

  const stockResults = async (name) => {
    console.log('This is inside of the FETCH', name);
    const data = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ranking=2&number=20&ingredients=${name}`
      //`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&ranking=2&number=20&ingredients=${name}`
    );
    //console.log("this is the data", data);
    const recipes = await data.json();
    //console.log('this is the recipes results 1', recipes);
    setStockRecipes(recipes);
    console.log('this is the recipes results 2', recipes);
  };

  useEffect(() => {
    stockResults(params.searchString);
  }, [params.searchString]);

  //console.log("this is the search results of PARAMS", params.searchString);
  //console.log("this is the search results YAHOO", stockRecipes);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleFavorite = (item) => {
    console.log( 'CLICKED HEART', item );
    let favoriteItem = {
      spoon_id: item.id,
      recipe_name: item.title,
      recipe_image: item.image,
    }
    dispatch({ type: 'ADD_FAVORITE', payload: favoriteItem });
    MySwal.fire(`Recipe added to favorites!`);
    setFavoriteItem({ id: 0, image: '', title: ''});
  }

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
      <Grid container spacing={6}>
        {stockRecipes.map((item) => {
          let percentage = parseFloat(
            (Number(item.usedIngredientCount) /
              (Number(item.usedIngredientCount) +
                Number(item.missedIngredientCount))) *
              100
          ).toFixed(2);

          console.log('This is the percentage', percentage);
          return (
            <div key={item.id}>
              <Grid item xs={12} md={12}>
                {/* <h2>{item.title}</h2>
                <Link to={"/recipeDetails/" + item.id}>
                  <img src={item.image} alt="RecipeImage" />
                </Link>
                <p>{item.missedIngredientCount}</p>
                <p>{item.usedIngredientCount}</p> */}
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
                    <IconButton aria-label='add to favorites'>
                      <FavoriteIcon />
                    </IconButton>
                    <Typography>
                      {percentage}
                    </Typography>
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

export default StockSearchResults;
