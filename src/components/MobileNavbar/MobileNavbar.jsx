import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import { slide as Menu } from 'react-burger-menu'; // Import the slide animation

// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './MobileNavbar.css';

function MobileNavbar() {

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
            position: 'fixed',
            width: '24px',
            height: '30px',
            left: '24px',
            top: '24px',
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenu: {
            background: '#FFF',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em',
        },
        bmItemList: {
            color: '#000',
            padding: '0.8em',
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
        <div>
            {/* Trigger Button (use fixed positioning) */}
            <Button
                style={{ ...styles.bmBurgerButton, position: 'absolute', zIndex: 999 }}
                onClick={toggleMenu}
                startIcon={menuOpen ?
                    <MenuOpenIcon style={{ color: 'white', fontSize: '4rem' }} /> :
                    <MenuIcon style={{ color: 'white', fontSize: '4rem' }} />
                }
            >
                <i style={{ color: 'white', visibility: 'visible' }}></i>
            </Button>

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
        </div>
    );
}

export default MobileNavbar;