import { useTheme, useMediaQuery, Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

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
            <header className='header'>
                <div className="header-content">
                    <div className='header--flex'>
                        <div className="header__logo" onClick={() => history.push('/')}>
                            <img src="images/avatars/sous.png" className="header__img" alt="SousAI" />
                        </div>
                        <div className="header__searchBar header__searchBar--main"
                            style={{
                                display: 'flex', flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div className="header__container">
                                <button className="button--icon">
                                    <SearchIcon className='icon--black' />
                                </button>
                                <input
                                    value={searchQuery}
                                    type="text"
                                    placeholder="What would you like to cook?"
                                    className="header__searchBar"
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                                {searchQuery ? (
                                    <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' />
                                ) : null}
                            </div>

                        </div>
                        <Button onClick={() => history.push('/recipe-box')} variant="text" className="header__button button__recipe-box" startIcon={<BookmarkIcon className='icon--black' />}>
                            Your Recipe Box
                        </Button>
                        <div className='menuDiv'>
                            <Button id="basic-button"
                                className='header__button'
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="menu"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <MenuIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}>
                                <MenuItem onClick={handleClose}>
                                    <Link className='navLink' to="/recipe-box">
                                        Preferences
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link className='navLink' to="/recipe-box">
                                        Submit a suggestion
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link className='navLink' to="/recipe-box">
                                        Report a bug
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button onClick={() => dispatch({ type: 'LOGOUT' })} className="header__button"><LogoutIcon /> Logout</Button>
                                </MenuItem>

                            </Menu>
                        </div>

                    </div>
                    <div>
                        <button className='header__button hover' onClick={() => history.push('/')}>SousAI</button>
                        <button className='header__button hover' onClick={() => history.push('/recipe-box')}>Recipes</button>
                        <button className='header__button hover'>Ingredients</button>
                        <button className='header__button hover'>Occasions</button>
                        <button className='header__button hover'>About</button>
                    </div>
                </div>
            </header>
    );
}

export default Header;