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
  Icon,
  InputLabel,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { Favorite, Percent } from '@mui/icons-material';

function StockSearchResults() {
  const stockRecipes = useSelector((store) => store.searchData);
  //const [stockRecipes, setStockRecipes] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [dow, setDow] = useState('');
  const dowList = useSelector((store) => store.dow);

  // const stockResults = async (name) => {
  //   const data = await fetch(
  //     `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ranking=2&number=20&ingredients=${name}`
  //     //`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&ranking=2&number=20&ingredients=${name}`
  //     //`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_THIRD_API_KEY}&ranking=2&number=20&ingredients=${name}`
  //   );
  //   //console.log("this is the data", data);
  //   const recipes = await data.json();
  //   //console.log('this is the recipes results 1', recipes);
  //   setStockRecipes(recipes);
  // };

  useEffect(() => {
    handleManySearch(params.searchString);
  }, [params.searchString]);

  //console.log("this is the search results of PARAMS", params.searchString);
  //console.log("this is the search results YAHOO", stockRecipes);

  const handleManySearch = (searchItem) => {
    //This search is for all of my ingredients
    dispatch({ type:'GET_MANY', payload: searchItem})
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
    <div style={{ 
      padding: '24px',
      width: '100%',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '48px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--apple-dark-gray)',
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px'
        }}>
          Recipe Match Results
        </h2>
        <p style={{
          color: 'var(--apple-gray)',
          fontSize: '1rem',
          margin: 0
        }}>
          {stockRecipes.length} recipes found based on your ingredients
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
        {stockRecipes.map((item) => {
          let percentage = parseFloat(
            (Number(item.usedIngredientCount) /
              (Number(item.usedIngredientCount) +
                Number(item.missedIngredientCount))) *
              100
          ).toFixed(0);

          return (
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
                  {/* Match Percentage Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: percentage >= 80 ? 'var(--apple-green)' : percentage >= 60 ? 'var(--apple-orange)' : 'var(--apple-red)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'var(--font-weight-semibold)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {percentage}%
                  </div>

                  {/* Recipe Title Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    padding: '32px 16px 16px',
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

              {/* Ingredient Match Info */}
              <div style={{
                padding: '16px',
                background: 'rgba(0, 122, 255, 0.05)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  color: 'var(--apple-gray)'
                }}>
                  <span>✅ Have: {item.usedIngredientCount}</span>
                  <span>❌ Missing: {item.missedIngredientCount}</span>
                </div>
              </div>

              {/* Recipe Actions */}
              <div style={{
                padding: '16px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <button 
                  onClick={() => handleFavorite(item)}
                  className="apple-button"
                  style={{
                    fontSize: '0.85rem',
                    padding: '8px 16px',
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
                    padding: '8px 16px',
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
                    padding: '16px'
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
                  <FormControl fullWidth style={{ marginTop: '16px' }}>
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
                  padding: '16px',
                  gap: '8px'
                }}>
                  <button 
                    onClick={handleClose}
                    className="apple-button secondary"
                    style={{
                      padding: '8px 24px'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveDow(item)}
                    className="apple-button"
                    style={{
                      padding: '8px 24px'
                    }}
                  >
                    Add to Menu
                  </button>
                </DialogActions>
              </Dialog>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {stockRecipes.length === 0 && (
        <div className="apple-card" style={{
          textAlign: 'center',
          padding: '64px',
          marginTop: '48px'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '24px'
          }}>
            🔍
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--apple-dark-gray)',
            margin: '0 0 8px 0'
          }}>
            No matching recipes found
          </h3>
          <p style={{
            color: 'var(--apple-gray)',
            fontSize: '1rem',
            margin: 0
          }}>
            Try adding more ingredients to your search
          </p>
        </div>
      )}
    </div>
  );
}

export default StockSearchResults;
