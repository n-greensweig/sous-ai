import { Button } from '@mui/material';
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
function Header() {
    // Hook to programmatically navigate between routes
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleSetActiveItem = (itemId) => setActiveItem(itemId);
    const handleClearActiveItem = () => setActiveItem(null);
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
        <header className='header'>
            <div className="header-content">
                <div className='header--flex'>
                    <div className="header__logo" onClick={() => history.push('/')}>
                        <img src="images/avatars/sous.svg" className="header__img" alt="Sous" />
                    </div>
                    <div className="header__search-bar header__search-bar--wrapper">
                        <div className="header__container">
                            <SearchIcon className='icon--black' />
                            <input
                                value={searchQuery}
                                type="text"
                                placeholder="What would you like to cook?"
                                className="header__search-bar"
                                onChange={(event) => setSearchQuery(event.target.value)} />
                        </div>
                        {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray header__search-bar--cancel-icon' /> : null}
                    </div>
                    <Button
                        className="header__button button__recipe-box"
                        onClick={() => navigateTo('/recipe-box')}
                        onMouseOver={() => handleSetActiveItem('bookmark-hover')}
                        onMouseLeave={handleClearActiveItem}
                        onMouseDown={() => handleSetActiveItem('bookmark')}
                        onMouseUp={handleClearActiveItem}
                        onDragStart={event => handleDragStart(event, 'saved')}
                        onDragEnd={handleClearActiveItem}
                        draggable
                        variant="text"
                        startIcon={<BookmarkIcon className={`${activeItem === 'bookmark' ? 'fill-red' : activeItem === 'bookmark-hover' ? 'fill-gray' : 'fill-black'}`} />}>
                        Your Recipe Box
                    </Button>
                    <div className='menuDiv'>
                        <Button id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="menu"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            onMouseOver={() => handleSetActiveItem('person-hover')}
                            onMouseLeave={handleClearActiveItem}
                            onMouseDown={() => handleSetActiveItem('person')}
                            onMouseUp={handleClearActiveItem}
                            onDragEnd={handleClearActiveItem}
                            draggable>
                            <PersonIcon className={`${activeItem === 'person' ? 'fill-red' : activeItem === 'person-hover' ? 'fill-gray' : 'fill-black'}`} />
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
                </div>
            </div>
        </header >
    );
}

export default Header;