import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LogoutIcon from '@mui/icons-material/Logout';

function Nav() {

  const user = useSelector((store) => store.user);
  const location = useLocation();

  const isActive = route => location.pathname === route ? 'navLink active' : 'navLink';

  return (
    <div className="nav">
      {/* <div> */}
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <div id='sous-footer'>
            <Link className={isActive('/user')} to="/user">
              <AutoFixHighIcon className='icon' /> SousAI
            </Link>
          </div>
          <div id='saved-footer'>
            <Link className={isActive('/recipes')} to="/recipes">
              <MenuBookIcon className='icon' /> Saved Recipes
            </Link>
          </div>
          <div id='about-footer'>
            <Link className={isActive('/about')} to="/about">About</Link>
          </div>
          <div id='log-out-footer'>
            <LogOutButton className={isActive('/logout')} />
          </div>
        </>
      )}
    </div>
  );
}

export default Nav;
