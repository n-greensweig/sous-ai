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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
                <div>
                    <Button
                        aria-label={menuOpen ? 'Opened menu' : 'Closed menu'}
                        style={{ ...styles.bmBurgerButton, position: 'relative', zIndex: 999 }}
                        onClick={toggleMenu}
                        startIcon={menuOpen ?
                            <MenuOpenIcon className='icon__fill-black' style={{ color: 'white', }} /> :
                            <MenuIcon className='icon__fill-black' style={{ color: 'white', }} />
                        }
                    >
                        <i style={{ color: 'white', visibility: 'visible' }}></i>
                    </Button>
                </div>
                <div onClick={() => history.push('/')} style={{
                    display: 'flex', alignItems: 'center', width: '35%', height: '40px', justifyContent: 'center',
                }}>
                    <img src="images/avatars/sous.svg" className="header__img--mobile" alt="Sous" />
                    <p>&nbsp;| Sous</p>
                </div>
                <div style={{ display: 'flex', }}>
                    <BookmarkIcon className='icon__fill-black icon__padding' onClick={() => {
                        history.push('/recipe-box');
                        dispatch({ type: 'FETCH_RECIPES' });
                    }} />
                    <PersonIcon id="basic-button"
                        className='icon__fill-black icon__padding header__button--red'
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
                            fill: activeItem === 'person' ? '#df321b' :
                                activeItem === 'person-hover' ? '#767676' : 'black',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }
                        }} />
                </div>
            </div>

            {/* Burger Menu on left side of page */}
            <BurgerMenu
                isOpen={menuOpen}
                onStateChange={handleStateChange}
                styles={styles}
                left
                className='hide'
            >
                <Link to="/" onClick={closeMenu} style={{ width: '100%', textAlign: 'left', textDecoration: 'none' }}>Sous</Link>
                <div style={{ width: '100%', textAlign: 'left', alignItems: 'center', }}>
                    <Link to="/recipe-box" onClick={closeMenu} style={{ color: '#000', textDecoration: 'none', }}>
                        Saved Recipes
                    </Link>
                </div>
                <Link to="/preferences" onClick={closeMenu} style={{ width: '100%', textAlign: 'left', textDecoration: 'none' }}>Preferences</Link>
                <Link to="/pantry" onClick={closeMenu} style={{ width: '100%', textAlign: 'left', textDecoration: 'none' }}>Pantry</Link>
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
                    dispatch({ type: 'LOGOUT' })
                }
                }>Logout</MenuItem>

            </Menu>
        </header >
    );
}

export default MobileNavbar;