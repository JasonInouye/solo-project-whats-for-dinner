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
    <div style={{ 
      padding: '24px',
      width: '100%',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: 'var(--spacing-xl)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 var(--spacing-sm) 0',
          letterSpacing: '-0.5px'
        }}>
          Search Results for "{params.searchItem}"
        </h2>
        <p style={{
          color: 'var(--apple-gray)',
          fontSize: '1rem',
          margin: 0
        }}>
          {searchRecipes.length} recipes found
        </p>
      </div>

      {/* Responsive Recipe Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        width: '100%',
        justifyContent: 'flex-start'
      }}>
        {searchRecipes.map((item) => (
          <div key={item.id} className="apple-card" style={{
            padding: 0,
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
            flex: '1 1 180px',
            maxWidth: '280px',
            minWidth: '180px',
            margin: 0
          }}>
            {/* Recipe Image */}
            <Link 
              to={'/recipeDetails/' + item.id}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                width: '100%',
                height: '200px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                {/* Overlay for better text readability */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: 'var(--spacing-lg) var(--spacing-md) var(--spacing-md)',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'var(--font-weight-semibold)',
                    margin: 0,
                    lineHeight: 1.3,
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Recipe Actions */}
            <div style={{
              padding: 'var(--spacing-md)',
              display: 'flex',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => handleFavorite(item)}
                className="apple-button"
                style={{
                  fontSize: '0.85rem',
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  flex: 1,
                  minWidth: '120px'
                }}
              >
                ❤️ Favorite
              </button>
              
              <button
                onClick={() => setOpen(true)}
                className="apple-button secondary"
                style={{
                  fontSize: '0.85rem',
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  flex: 1,
                  minWidth: '120px'
                }}
              >
                📅 Add to Menu
              </button>
            </div>

            {/* Day Selection Dialog */}
            <Dialog
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  borderRadius: 'var(--border-radius-lg)',
                  padding: 'var(--spacing-md)'
                }
              }}
            >
              <DialogTitle style={{
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--apple-dark-gray)',
                textAlign: 'center'
              }}>
                Choose a Day
              </DialogTitle>
              <DialogContent>
                <FormControl fullWidth style={{ marginTop: 'var(--spacing-md)' }}>
                  <InputLabel style={{ color: 'var(--apple-gray)' }}>
                    Select Day of Week
                  </InputLabel>
                  <Select
                    native
                    value={dow.dow}
                    onChange={(event) => setDow(event.target.value)}
                    input={<OutlinedInput label="Select Day of Week" />}
                    style={{
                      borderRadius: 'var(--border-radius-sm)'
                    }}
                  >
                    <option value="">Choose a day...</option>
                    {dowList.map((dayItem) => (
                      <option key={dayItem.id} value={dayItem.dow}>
                        {dayItem.dow}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions style={{
                padding: 'var(--spacing-md)',
                gap: 'var(--spacing-sm)'
              }}>
                <button 
                  onClick={handleClose}
                  className="apple-button secondary"
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => saveDow(favoriteItem)}
                  className="apple-button"
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)'
                  }}
                >
                  Add to Menu
                </button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {searchRecipes.length === 0 && (
        <div className="apple-card" style={{
          textAlign: 'center',
          padding: 'var(--spacing-xxl)',
          marginTop: 'var(--spacing-xl)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: 'var(--spacing-md)'
          }}>
            🔍
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--apple-dark-gray)',
            margin: '0 0 var(--spacing-sm) 0'
          }}>
            No recipes found
          </h3>
          <p style={{
            color: 'var(--apple-gray)',
            fontSize: '1rem',
            margin: 0
          }}>
            Try searching for different ingredients or dish names
          </p>
        </div>
      )}
    </div>
  );
}

export default SingleSearchResults;
