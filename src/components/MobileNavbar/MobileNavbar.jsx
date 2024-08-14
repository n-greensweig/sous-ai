import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { slide as BurgerMenu } from 'react-burger-menu'; // Import the slide animation
import { Menu, MenuItem } from '@mui/material';
// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import './MobileNavbar.css';
function MobileNavbar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const handleStateChange = state => setMenuOpen(state.isOpen);
    const closeMenu = () => setMenuOpen(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleSetActiveItem = (itemId) => setActiveItem(itemId);
    const handleClearActiveItem = () => setActiveItem(null);
    const handleClose = () => setAnchorEl(null);

    // Define styles for the burger menu
    let styles = {
        bmBurgerButton: {
            position: 'relative',
            width: '20px',
            height: '14x',
        },
        bmCrossButton: {
            height: '20px',
            width: '14px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenu: {
            background: '#FFF',
            padding: '1.5em .5em',
            fontSize: '1.15em',
        },
        bmItemList: {
            color: '#000',
            display: 'flex',
            flexDirection: 'column', // Align items vertically
            alignItems: 'flex-start', // Center align items horizontally
            justifyContent: 'flex-start',
        },
        bmItem: {
            display: 'inline-block',
            marginBottom: '10px',
            justifyContent: 'left',
            fontSize: '1.5rem',
            color: '#000',
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    };
    return (
        <header className='mobile-header'>
            <div className='mobile-header__wrapper display-flex align-center justify-sb'>
                <div>
                    <Button
                        aria-label={menuOpen ? 'Opened menu' : 'Closed menu'}
                        style={{ ...styles.bmBurgerButton, position: 'relative', zIndex: 999 }}
                        onClick={toggleMenu}
                        startIcon={menuOpen ?
                            <MenuOpenIcon className='fill-black' /> :
                            <MenuIcon className='fill-black' />
                        }
                    >
                    </Button>
                </div>
                <div className='mobile-header__icon-wrapper display-flex align-center justify-center' onClick={() => history.push('/')}>
                    <img src="images/avatars/sous.svg" className="header__img--mobile" alt="Sous" />
                    <p>&nbsp;| Sous</p>
                </div>
                <div className='display-flex'>
                    <BookmarkIcon className='mobile__header-icon fill-black' onClick={() => {
                        history.push('/recipe-box');
                        dispatch({ type: 'FETCH_RECIPES' });
                        }} />
                    <PersonIcon
                        id="basic-button"
                        className='mobile__header-icon fill-black'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="menu"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        onMouseOver={() => handleSetActiveItem('person-hover')}
                        onMouseLeave={handleClearActiveItem}
                        onMouseDown={() => handleSetActiveItem('person')}
                        onMouseUp={handleClearActiveItem}
                        onDragEnd={handleClearActiveItem}
                        draggable />
                </div>
            </div>

            {/* Burger Menu on left side of page */}
            <BurgerMenu isOpen={menuOpen} onStateChange={handleStateChange} styles={styles} left className='hide'>
                <Link to="/" onClick={closeMenu} className='width-100 text-left no-decoration'>Sous</Link>
                    <Link to="/recipe-box" onClick={closeMenu} className='width-100 text-left no-decoration'>
                        Saved Recipes
                    </Link>
                <Link to="/preferences" onClick={closeMenu} className='width-100 text-left no-decoration'>Preferences</Link>
                <Link to="/pantry" onClick={closeMenu} className='width-100 text-left no-decoration'>Pantry</Link>
            </BurgerMenu>
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
                <MenuItem className='navLink' onClick={() => {
                    handleClose();
                    dispatch({ type: 'LOGOUT' });
                }
                }>Logout</MenuItem>

            </Menu>
        </header >
    );
}

export default MobileNavbar;