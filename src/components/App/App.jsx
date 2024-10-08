import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SousAI from '../SousAI/SousAI';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
import RecipeItems from '../RecipeItems/RecipeItems';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import Preferences from '../Preferences/Preferences';
import Pantry from '../Pantry/Pantry';
import Header from '../Header/Header';
import MobileNavbar from '../MobileNavbar/MobileNavbar';
import { SignIn } from '@clerk/clerk-react';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id ? <Header /> : null}
        {user.id ? <MobileNavbar /> : null}
        <Switch>
          <SignIn path='/sign-in' forceRedirectUrl='/user' />
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <SousAI />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Preferences else shows LoginPage
            exact
            path="/preferences"
          >
            <Preferences />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Pantry else shows LoginPage
            exact
            path="/pantry"
          >
            <Pantry />
          </ProtectedRoute>

          <Route
            // Change to ProtectedRoute in the future if desired
            exact
            path="/recipes/:id"
          >
            <RecipeDetails user={user} />
          </Route>
          <ProtectedRoute
            // logged in shows RecipeItems else shows LoginPage
            exact
            path="/recipe-box"
          >
            <RecipeItems path={'/recipe-box'} />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows RecipeItems else shows LoginPage
            exact
            path="/recipe-box/all"
          >
            <RecipeItems path={'/recipe-box/all'} />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows cooked recipes else shows LoginPage
            exact
            path="/recipe-box/cooked"
          >
            <RecipeItems path={'/recipe-box/cooked'} />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows recently viewed else shows LoginPage
            exact
            path="/recipe-box/recent"
          >
            <RecipeItems path={'/recipe-box/recent'} />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows recipes from folder else shows LoginPage
            exact
            path="/recipe-box/:id"
          >
            <RecipeItems path={'/recipe-box/:id'} />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
