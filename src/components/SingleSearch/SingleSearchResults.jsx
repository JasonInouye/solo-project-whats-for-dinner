import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Grid,
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
      
      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&query=${name}`
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
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

  const saveDow = (item) => {
    let addDow = {
      spoon_id: item.id,
      dow: dow,
    };
    dispatch({ type: 'SET_MENU_DOW', payload: addDow });
    setOpen(false);
  };

  return (
    <div className="main-container">
      <Grid container spacing={6}>
      {searchedRecipes.map((item) => {
        console.log( 'This is the item', item);
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
                    <IconButton aria-label='add to favorites' onClick={() => handleFavorite(item)}>
                      <FavoriteIcon />
                    </IconButton>
                    {/* <Button onClick={handleClickOpen}>Select a Day</Button> */}
                    <Box marginLeft={14}>
                    <select
                      id='dow'
                      name='dow'
                      defaultValue={dowList[0]}
                      onChange={(event) => setDow(event.target.value)}
                    >
                      {dowList.map((dow) => {
                        return (
                          <option key={dow.id} value={dow.dow}>
                            {dow.dow}
                          </option>
                        );
                      })}
                    </select>
                    <Button onClick={() => saveDow(item)}>
                      Add Day
                    </Button>
                    </Box>
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
