import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import DinnerHomeTwo from '../DinnerHome/DinnerHome';
import WeeklySchedule from '../WeeklySchedule/WeeklySchedule';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import IngredientsRefrigerator from '../Ingredients/IngredientsRefrigerator';
import EditIngredient from '../Ingredients/EditIngredient';
import IngredientsPantry from '../Ingredients/IngredientsPantry';
import IngredientsSpices from '../Ingredients/IngredientsSpices';
import SingleSearch from '../SingleSearch/SingleSearch';
import SingleSearchResults from '../SingleSearch/SingleSearchResults';
import StockSearch from '../StockSearch/StockSearch';
import StockSearchResults from '../StockSearch/StockSearchResults';
import {Box} from '@mui/material'

function MainContainer() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (

    <Box flex={8} p={2}>
      <Switch>
        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
        <Redirect exact from='/' to='/home' />

        {/* Visiting localhost:3000/about will show the about page. */}
        <Route
          // shows AboutPage at all times (logged in or not)
          exact
          path='/about'
        >
          <AboutPage />
        </Route>

        {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
        <ProtectedRoute
          // logged in shows UserPage else shows LoginPage
          exact
          path='/user'
        >
          <UserPage />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/info'
        >
          <InfoPage />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/favorite'
        >
          <DinnerHomeTwo />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/search'
        >
          <SingleSearch />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/search/:searchItem'
        >
          <SingleSearchResults />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/stockSearch'
        >
          <StockSearch />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/stockSearch/:searchString'
        >
          <StockSearchResults />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/schedule'
        >
          <WeeklySchedule />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/recipeDetails/:id'
        >
          <RecipeDetails />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/ingredients/refrigerator'
        >
          <IngredientsRefrigerator />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/ingredients/pantry'
        >
          <IngredientsPantry />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/ingredients/spices'
        >
          <IngredientsSpices />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path='/edit/:id'
        >
          <EditIngredient />
        </ProtectedRoute>

        <Route exact path='/login'>
          {user.id ? (
            // If the user is already logged in,
            // redirect to the /user page
            <Redirect to='/user' />
          ) : (
            // Otherwise, show the login page
            <LoginPage />
          )}
        </Route>

        <Route exact path='/registration'>
          {user.id ? (
            // If the user is already logged in,
            // redirect them to the /user page
            <Redirect to='/user' />
          ) : (
            // Otherwise, show the registration page
            <RegisterPage />
          )}
        </Route>

        <Route exact path='/home'>
          {user.id ? (
            // If the user is already logged in,
            // redirect them to the /user page
            <Redirect to='/user' />
          ) : (
            // Otherwise, show the Landing page
            <LandingPage />
          )}
        </Route>

        {/* If none of the other routes matched, we will show a 404. */}
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </Box>
  );
}

export default MainContainer;
