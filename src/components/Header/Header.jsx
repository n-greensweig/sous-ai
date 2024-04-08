import { useTheme, useMediaQuery, Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'; // Note: This import is unused and could be removed.
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch } from 'react-redux';
/**
 * Renders a header component that is responsive and navigates to a specified route when clicked.
 * 
 * @param {Object} props - Component props including navigation path and text.
 * @returns A header component or null based on screen size.
 */
function Header() {
    // Hook to programmatically navigate between routes
    const history = useHistory();
    const dispatch = useDispatch();

    // MUI theme hooks for responsive design
    const theme = useTheme();
    // Determines if the screen width is less than or equal to the size of extra-small devices
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    // Determines if the screen width is less than or equal to the size of small devices
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        // Conditionally renders the header based on screen size
        // Header is not rendered on extra-small and small devices
        isXsScreen || isSmScreen ? null :
            <header>
                <div className='header--flex'>
                    <div className="header__logo" onClick={() => history.push('/')}>
                        <img src="images/avatars/sous.png" className="header__img" alt="SousAI" />
                        <div className='header__bar'></div>
                        <strong>SousAI</strong>
                    </div>
                    <Button variant="text" className="header__button" startIcon={<SearchIcon className='icon--black' />}></Button>
                    <input type="text" placeholder="What would you like to cook?" className="header__searchBar" />
                    <Button onClick={() => history.push('/recipes')} variant="text" className="header__button" startIcon={<BookmarkIcon className='icon--black' />}>
                        Your Recipe Box
                    </Button>
                    {/* <LogOutButton className="header__button" /> */}
                    <Button onClick={() => dispatch({ type: 'LOGOUT' })} startIcon={<PersonIcon className='icon--black' />} className="header__button"></Button>
                </div>
                <div>
                    <button className='header__button hover'>What to Cook</button>
                    <button className='header__button hover' onClick={() => history.push('/recipes')}>Recipes</button>
                    <button className='header__button hover'>Ingredients</button>
                    <button className='header__button hover'>Occasions</button>
                    <button className='header__button hover'>About</button>
                </div>
            </header>
    );
}

export default Header;