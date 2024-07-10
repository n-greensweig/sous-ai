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
    // const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    // const toggleDropdown = () => setShowDropdown(!showDropdown);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleStateChange = state => setMenuOpen(state.isOpen);
    const closeMenu = () => {
        setMenuOpen(false);
        // setShowDropdown(false);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSetActiveItem = (itemId) => {
        setActiveItem(itemId);
    };
    const handleClearActiveItem = () => {
        setActiveItem(null);
    };
    const handleClose = () => {
        setAnchorEl(null)
    };

    // Define styles for the burger menu
    var styles = {
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
        <header className="fixed-header" style={{ height: '50px', alignItems: 'center', }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
                <div>
                    <Button
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
                    <img src="images/avatars/sous.png" className="header__img--mobile" alt="SousAI" />
                    <p>&nbsp;| SousAI</p>
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
                <Link to="/" onClick={closeMenu} style={{ width: '100%', textAlign: 'left', textDecoration: 'none' }}>SousAI</Link>
                <div style={{ width: '100%', textAlign: 'left', alignItems: 'center', }}>
                    <Link to="/recipe-box" onClick={closeMenu} style={{ color: '#000', textDecoration: 'none', }}>
                        Saved Recipes
                    </Link>
                    {/* {showDropdown ? <KeyboardArrowDownIcon onClick={toggleDropdown} style={{ fontSize: '1.5rem', textAlign: 'end', fill: '#000', textDecoration: 'none' }} /> :
                        <KeyboardArrowRightIcon onClick={toggleDropdown} style={{ fontSize: '1.5rem', textAlign: 'end', fill: '#000', textDecoration: 'none' }} />} */}
                </div>
                <Link to="/preferences" onClick={closeMenu} style={{ width: '100%', textAlign: 'left', textDecoration: 'none' }}>Preferences</Link>
                {/* {showDropdown && (
                    <ul>
                        <Link style={{ textDecoration: "none" }} to="/recipe-box/cooked" onClick={closeMenu}>
                            <li className='dropdown-item'>Cooked recipes</li>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/recipe-box/recent" onClick={closeMenu}>
                            <li className='dropdown-item'>Recently viewed recipes</li>
                        </Link>
                    </ul>
                )} */}
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
                {/* <MenuItem onClick={handleClose}>
                    <Link className='navLink' to="/recipe-box">
                        Submit a suggestion
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link className='navLink' to="/recipe-box">
                        Report a bug
                    </Link>
                </MenuItem> */}
                <MenuItem onClick={handleClose}>
                    <Button onClick={() => dispatch({ type: 'LOGOUT' })} style={{ textTransform: 'none', }} className="header__button">
                        {/* <LogoutIcon /> */}
                        Logout</Button>
                </MenuItem>

            </Menu>
        </header >
    );
}

export default MobileNavbar;