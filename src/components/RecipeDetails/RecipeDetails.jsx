import { Button, Backdrop, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  let params = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [selectedButton, setSelectedButton] = useState('instructions');
  const [loading, setLoading] = (false)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      //`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SECOND_API_KEY}`
      // `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.id}/information?rapidapi-key=${process.env.REACT_RAPID_API_KEY}`
    );
    const detailData = await data.json();
    setRecipeDetails(detailData);
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(()=> { setLoading(false)}, 1000)
    fetchDetails();
  }, [params.id]);

  return (
    <>
      {recipeLoaded === true ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
      
        <div className='main-container'>
          <div>
            <h2>{recipeDetails.title}</h2>
            <img src={recipeDetails?.image} alt='RecipeImage' />
          </div>

          {/* setting the active class based on which button is selected */}
          <Button
            variant='text'
            className={selectedButton === 'instructions' ? 'active' : ''}
            onClick={() => setSelectedButton('instructions')}
          >
            Instructions
          </Button>
          <Button
            variant='text'
            className={selectedButton === 'ingredients' ? 'active' : ''}
            onClick={() => setSelectedButton('ingredients')}
          >
            Ingredients
          </Button>
          {selectedButton === 'instructions' && (
            <div>
              {/* this code sets the raw api data with html tags to render html data on dom */}
              <p
                dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
              ></p>
            </div>
          )}
          {selectedButton === 'ingredients' && (
            <ul>
              {recipeDetails.extendedIngredients?.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.original}</li>;
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
