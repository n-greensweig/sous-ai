import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // React Router hooks for navigation and location information
import LogOutButton from '../LogOutButton/LogOutButton'; // Custom logout button component
import './Nav.css'; // Styles specific to navigation
import { useSelector } from 'react-redux'; // Redux hook to access the global state
import { useTheme, useMediaQuery } from "@mui/material"; // MUI hooks for theme and media queries

// MUI icons for navigation links
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LogoutIcon from '@mui/icons-material/Logout'; // Unused import, consider removing

function Nav() {
  const user = useSelector((store) => store.user); // Accessing user state from Redux store
  const location = useLocation(); // Hook to access the current location object

  // Function to determine if a navigation link is active based on the current route
  const isActive = route => location.pathname.startsWith(route) ? 'navLink active' : 'navLink';

  // Use theme and media queries to adapt UI for responsive design
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="nav" style={{ height: isXsScreen || isSmScreen ? '50px' : null }}>
      {/* Conditional rendering based on user authentication status */}
      {!user.id && (
        // Shows login or register link if no user is logged in
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      {user.id && (
        // Navigation links available to logged-in users
        <>
          <div id='sous-footer'>
            {/* Link to user's dashboard or home, active state based on current route */}
            <Link className={isActive('/user')} to="/user">
              <AutoFixHighIcon className='icon' /> SousAI
            </Link>
          </div>
          <div id='saved-footer'>
            {/* Link to saved recipes, active state based on current route */}
            <Link className={isActive('/recipes')} to="/recipes">
              <MenuBookIcon className='icon' /> Saved Recipes
            </Link>
          </div>
          {/* Example of how to add more navigation links */}
          {/* <div id='about-footer'>
            <Link className={isActive('/about')} to="/about">About</Link>
          </div> */}
          <div id='log-out-footer'>
            {/* Log out button, styled based on current route */}
            <LogOutButton className={isActive('/logout')} />
          </div>
        </>
      )}
    </div>
  );
}

export default Nav;