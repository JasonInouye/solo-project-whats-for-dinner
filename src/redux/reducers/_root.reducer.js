import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import favorite from './dinner.get.reducers' // this reducer is for favorite list. Poor naming choice lol. 
import dow from './dow.get.reducers'
import ingredients from './ingredients.reducer'
import editIngredient from './edit.reducer';
import scheduleData from './schedule.reducer';
import recipeDetails from './details.reducer';
import searchData from './search.reducer.js'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  favorite,
  dow,
  ingredients,
  editIngredient,
  scheduleData,
  recipeDetails,
  searchData,
});

export default rootReducer;
