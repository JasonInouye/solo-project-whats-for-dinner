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
import swal from 'sweetalert';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

function DinnerHome() {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const favorite = useSelector((store) => store.favorite);
  const dowList = useSelector((store) => store.dow);
  const [dow, setDow] = useState('');
  // const MySwal = withReactContent(Swal);

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
    let addDow = {
      id: favoriteRecipe.id,
      spoon_id: favoriteRecipe.spoon_id,
      dow: dow,
    };
    // This initiates the drop down for the days
    dispatch({ type: 'SET_MENU_DOW', payload: addDow });
    swal({title: `Recipe added to ${dow}`,dangerMode: true});
  };

  return (
    <div className='main-container'>
      <h1>My Favorite Recipes</h1>
      <Grid container spacing={6}>
        {favorite.map((favoriteRecipe) => {
          return (
            <div key={favoriteRecipe.id}>
              <Grid item xs={12} md={12} key={favoriteRecipe.id}>
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
                    title={favoriteRecipe.recipe_name}
                  />
                  <Link to={'/recipeDetails/' + favoriteRecipe.spoon_id}>
                    <CardMedia
                      component='img'
                      height='20%'
                      image={favoriteRecipe.recipe_image}
                    />
                  </Link>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label='add to favorites'
                      onClick={(event) =>
                        dispatch({
                          type: 'DELETE_FAVORITE',
                          payload: favoriteRecipe.id,
                        })
                      }
                    >
                      <FavoriteIcon color='error' />
                    </IconButton>
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
                      <Button onClick={() => saveDow(favoriteRecipe)}>
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

export default DinnerHome;
