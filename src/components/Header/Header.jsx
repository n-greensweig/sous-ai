import { useTheme, useMediaQuery, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
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
    const [searchQuery, setSearchQuery] = useState('');


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
                    <div className="header__searchBar"
                        style={{
                            display: 'flex', flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{
                            width: '90%',
                        }}>
                            <Button variant="text" className="header__button" startIcon={
                                <SearchIcon className='icon--black' />
                            }></Button>
                            <input value={searchQuery} type="text" placeholder="What would you like to cook?" className="header__searchBar"
                                onChange={(event) => setSearchQuery(event.target.value)}
                                style={{ border: 'none', }}
                            />
                        </div>
                        {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' /> : null}
                    </div>
                    <Button onClick={() => history.push('/recipe-box')} variant="text" className="header__button button__recipe-box" startIcon={<BookmarkIcon className='icon--black' />}>
                        Your Recipe Box
                    </Button>
                    <Button onClick={() => dispatch({ type: 'LOGOUT' })} startIcon={<PersonIcon className='icon--black' />} className="header__button"></Button>
                </div>
                <div>
                    <button className='header__button hover'>What to Cook</button>
                    <button className='header__button hover' onClick={() => history.push('/recipe-box')}>Recipes</button>
                    <button className='header__button hover'>Ingredients</button>
                    <button className='header__button hover'>Occasions</button>
                    <button className='header__button hover'>About</button>
                </div>
            </header >
    );
}

export default Header;