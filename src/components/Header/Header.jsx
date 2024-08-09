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
import { Menu, MenuItem } from '@mui/material';
import MobileNavbar from '../MobileNavbar/MobileNavbar';
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
    const [activeItem, setActiveItem] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    // MUI theme hooks for responsive design
    const theme = useTheme();
    // Determines if the screen width is less than or equal to the size of extra-small devices
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    // Determines if the screen width is less than or equal to the size of small devices
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSetActiveItem = (itemId) => {
        setActiveItem(itemId);
    };

    const handleClearActiveItem = () => {
        setActiveItem(null);
    };

    const navigateTo = (path) => {
        history.push(path);
        handleClearActiveItem();
    };

    // Function to handle the drag start event
    const handleDragStart = (event, target) => {
        if (target === 'saved') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box'); // Set the URL to drag
        }
    };

    return (
        // Conditionally renders the header based on screen size
        // Header is not rendered on extra-small and small devices
        isXsScreen || isSmScreen ? <MobileNavbar /> :
            <header className='header'>
                <div className="header-content">
                    <div className='header--flex'>
                        <div className="header__logo" onClick={() => history.push('/')}>
                            <img src="images/avatars/sous.svg" className="header__img" alt="Sous" />
                        </div>
                        <div className="header__searchBar header__searchBar--main"
                            style={{
                                display: 'flex', flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <div className="header__container">
                                <SearchIcon className='icon--black' />
                                <input
                                    value={searchQuery}
                                    type="text"
                                    placeholder="What would you like to cook?"
                                    className="header__searchBar"
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </div>
                                {searchQuery ? (
                                    <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray header__search-bar--cancel-icon' />
                                ) : null}

                        </div>
                        <Button onClick={() => navigateTo('/recipe-box')}
                            onMouseOver={() => handleSetActiveItem('bookmark-hover')}
                            onMouseLeave={handleClearActiveItem}
                            onMouseDown={() => handleSetActiveItem('bookmark')}
                            onMouseUp={handleClearActiveItem}
                            onDragStart={event => handleDragStart(event, 'saved')}
                            onDragEnd={handleClearActiveItem}
                            draggable
                            variant="text" className="header__button button__recipe-box"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                }
                            }}
                            startIcon={<BookmarkIcon style={{
                                fill: activeItem === 'bookmark' ? '#df321b' :
                                    activeItem === 'bookmark-hover' ? '#767676' : 'black'
                            }} />}>
                            Your Recipe Box
                        </Button>
                        <div className='menuDiv'>
                            <Button id="basic-button"
                                className='header__button--red'
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="menu"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                onMouseOver={() => handleSetActiveItem('person-hover')}
                                onMouseLeave={handleClearActiveItem}
                                onMouseDown={() => handleSetActiveItem('person')}
                                onMouseUp={handleClearActiveItem}
                                onDragEnd={handleClearActiveItem}
                                draggable
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    }
                                }}
                            >
                                <PersonIcon style={{
                                    fill: activeItem === 'person' ? '#df321b' :
                                        activeItem === 'person-hover' ? '#767676' : 'black'
                                }} />
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
                                <MenuItem className='navLink' onClick={() => history.push('/preferences')}>
                                    Preferences
                                </MenuItem>
                                <MenuItem className='navLink' onClick={() => history.push('/pantry')}>
                                    Pantry
                                </MenuItem>
                                <MenuItem className='navLink' onClick={() => {
                                    handleClose();
                                    dispatch({ type: 'LOGOUT' })
                                }
                                }>Logout</MenuItem>
                            </Menu>
                        </div>

                    </div>
                    <div>
                        <button className='header__button hover' onClick={() => history.push('/')}>Sous</button>
                        <button className='header__button hover' onClick={() => history.push('/recipe-box')}>Recipes</button>
                        <button className='header__button hover' onClick={() => history.push('/preferences')}>Preferences</button>
                        <button className='header__button hover' onClick={() => history.push('/pantry')}>Pantry</button>
                        {/* <button className='header__button hover'>Occasions</button>
                        <button className='header__button hover'>About</button> */}
                    </div>
                </div>
            </header >
    );
}

export default Header;