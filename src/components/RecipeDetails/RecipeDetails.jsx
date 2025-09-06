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
  };

  //console.log('this is the JSON for details', recipeDetails);

  return (
    <div style={{ 
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Header Section */}
      <div className="apple-card" style={{
        padding: 0,
        overflow: 'hidden',
        marginBottom: 'var(--spacing-xl)'
      }}>
        {/* Recipe Image Hero */}
        <div style={{
          height: '300px',
          backgroundImage: `url(${recipeDetails.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          {/* Title Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            padding: 'var(--spacing-xl) var(--spacing-lg) var(--spacing-lg)',
            color: 'white'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'var(--font-weight-bold)',
              margin: 0,
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              {recipeDetails.title}
            </h1>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div style={{
          padding: 'var(--spacing-lg)',
          display: 'flex',
          gap: 'var(--spacing-md)',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          {/* Tab Buttons */}
          <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
            <button
              className={`apple-button ${selectedButton === 'ingredients' ? '' : 'secondary'}`}
              onClick={() => setSelectedButton('ingredients')}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                fontSize: '0.95rem'
              }}
            >
              📝 Ingredients
            </button>
            <button
              className={`apple-button ${selectedButton === 'instructions' ? '' : 'secondary'}`}
              onClick={() => setSelectedButton('instructions')}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                fontSize: '0.95rem'
              }}
            >
              👨‍🍳 Instructions
            </button>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={() => handleFavorite(recipeDetails)}
            className="apple-button"
            style={{
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              fontSize: '0.95rem',
              background: 'var(--apple-red)',
              borderColor: 'var(--apple-red)'
            }}
          >
            ❤️ Favorite
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="apple-card">
        {selectedButton === 'ingredients' && (
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--apple-dark-gray)',
              margin: '0 0 var(--spacing-lg) 0'
            }}>
              Ingredients
            </h2>
            <div style={{
              display: 'grid',
              gap: 'var(--spacing-sm)'
            }}>
              {recipeDetails.extendedIngredients?.map((ingredient) => (
                <div key={ingredient.id} style={{
                  padding: 'var(--spacing-sm)',
                  background: 'rgba(0, 122, 255, 0.05)',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '1rem',
                  color: 'var(--apple-dark-gray)'
                }}>
                  {ingredient.original}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {selectedButton === 'instructions' && (
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--apple-dark-gray)',
              margin: '0 0 var(--spacing-lg) 0'
            }}>
              Instructions
            </h2>
            <div
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--apple-gray)'
              }}
              dangerouslySetInnerHTML={{
                __html: recipeDetails.instructions,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
