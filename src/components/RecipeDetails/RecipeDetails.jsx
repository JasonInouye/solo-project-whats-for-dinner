import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';

function RecipeDetails() {
  let params = useParams();
  const [selectedButton, setSelectedButton] = useState('ingredients');
  const recipeDetails = useSelector((store) => store.recipeDetails);
  const dispatch = useDispatch();
  // const [favoriteItem, setFavoriteItem] = useState({
  //   spoon_id: 0,
  //   recipe_name: '',
  //   recipe_image: '',
  // });

  // const fetchDetails = async () => {
  //   const data = await fetch(
  //     //`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  //     //`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SECOND_API_KEY}`
  //     `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_THIRD_API_KEY}`
  //   );
  //   const detailData = await data.json();
  //   setRecipeDetails(detailData);
  // };

  useEffect(() => {
    handleDetails();
  }, [params.id]);

  const handleDetails = () => {
    dispatch({ type: 'GET_DETAILS', payload: params.id});
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

  //console.log('this is the JSON for details', recipeDetails);

  return (
    <div className='main-container'>
      <Grid container>
        <Grid item>
          <Card sx={{ width: 750, margin: 8, borderRadius: '16px'}}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  WFD
                </Avatar>
              }
              titleTypographyProps={{
                fontWeight: 'Bold',
                fontSize: 26,
              }}
              title={recipeDetails.title}
            />
            <CardMedia
              component='img'
              height='30%'
              image={recipeDetails.image}
            />
            <CardActions>
            <Button
                variant='text'
                className={selectedButton === 'ingredients' ? 'active' : ''}
                onClick={() => setSelectedButton('ingredients')}
              >
                Ingredients
              </Button>
              <Button
                variant='text'
                className={selectedButton === 'instructions' ? 'active' : ''}
                onClick={() => setSelectedButton('instructions')}
              >
                Instructions
              </Button>
              <Button onClick={() => handleFavorite(recipeDetails)}>
                      Favorite Recipe
                    </Button>

            </CardActions>
            <CardContent>
              {selectedButton === 'ingredients' && (
                <div className='ingredients'>
                  <ul>
                    {recipeDetails.extendedIngredients?.map((ingredient) => {
                     return (
                      <div key={ingredient.id}>
                        <li>{ingredient.original}</li>
                      </div>
                     )
                    })}
                  </ul>
                </div>
              )}
              {/* setting the active class based on which button is selected */}
              {selectedButton === 'instructions' && (
                <div className='instructions'>
                  {/* this code sets the raw api data with html tags to render html data on dom */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: recipeDetails.instructions,
                    }}
                  ></p>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default RecipeDetails;
