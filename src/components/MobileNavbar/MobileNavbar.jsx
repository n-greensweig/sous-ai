import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { Button } from '@mui/material';
import { slide as Menu } from 'react-burger-menu'; // Import the slide animation

// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import './MobileNavbar.css';

function MobileNavbar() {

    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleStateChange = state => setMenuOpen(state.isOpen);
    const closeMenu = () => {
        setMenuOpen(false);
        setShowDropdown(false);
    }

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
        <header style={{ border: '2px solid red', height: '35px', alignItems: 'center', }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    {/* <SearchIcon className='icon__fill-black' /> */}
                </div>
                <div onClick={() => history.push('/')} style={{
                    display: 'flex', alignItems: 'center' , width: '35%', height: '35px', justifyContent: 'center',
                    border: '2px solid blue',
                }}>
                    <img src="images/avatars/sous.png" className="header__img--mobile" alt="SousAI" />
                    <p>&nbsp;| Sous AI</p>
                </div>
                <div style={{ display: 'flex', }}>
                    <BookmarkIcon className='icon__fill-black' onClick={() => history.push('/recipe-box')} />
                    <PersonIcon className='icon__fill-black' />
                </div>
            </div>

            {/* Side Menu */}
            <Menu
                isOpen={menuOpen}
                onStateChange={handleStateChange}
                styles={styles}
                left
                className='hide'
            >
                <Link to="/" onClick={closeMenu} style={{ borderBottom: '1px solid white', width: '100%', textAlign: 'left', textDecoration: 'none' }}>SousAI</Link>
                <div style={{ borderBottom: '1px solid white', width: '100%', textAlign: 'left', }}>
                    <Link to="/recipe-box" onClick={closeMenu} style={{ color: '#000', textDecoration: 'none' }}>
                        Saved Recipes
                    </Link>
                    {showDropdown ? <KeyboardArrowDownIcon onClick={toggleDropdown} style={{ fontSize: '1.5rem', textAlign: 'end', fill: '#000', textDecoration: 'none' }} /> :
                        <KeyboardArrowRightIcon onClick={toggleDropdown} style={{ fontSize: '1.5rem', textAlign: 'end', fill: '#000', textDecoration: 'none' }} />}
                </div>
                {showDropdown && (
                    <ul>
                        <Link style={{ textDecoration: "none" }} to="/recipe-box/cooked" onClick={closeMenu}>
                            <li className='dropdown-item'>Cooked recipes</li>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/recipe-box/recent" onClick={closeMenu}>
                            <li className='dropdown-item'>Recently viewed recipes</li>
                        </Link>
                    </ul>
                )}
            </Menu>
        </header >
    );
}

export default MobileNavbar;