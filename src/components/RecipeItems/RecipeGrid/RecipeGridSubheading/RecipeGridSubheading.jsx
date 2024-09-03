import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// Importing Dialog components from Material UI for modal dialog functionality.
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './RecipeGridSubheading.css';
function RecipeGridSubheading({ listName, numOfRecipes, searchQuery, setSearchQuery, id, path }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCreating, setIsCreating] = useState(false); // Controls the dialog's visibility.
    const [newListName, setNewListName] = useState(listName); // Stores the new recipe list's name.
    const dispatch = useDispatch();
    const history = useHistory();

    // Toggles the isCreating state, controlling the visibility of the creation dialog.
    const toggleCreating = () => setIsCreating(!isCreating);
    const handlePopover = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const saveRecipeListName = (newListName) => dispatch({ type: 'UPDATE_RECIPE_LIST_NAME', payload: { id, newListName } });
    const deleteRecipeList = () => {
        dispatch({ type: 'REMOVE_RECIPE_LIST', payload: id });
        history.push('/recipe-box');
        dispatch({ type: 'FETCH_RECIPES', payload: searchQuery });
    };
    const open = Boolean(anchorEl);
    const popoverID = open ? 'simple-popover' : undefined;
    useEffect(() => {
    }, [listName]);
    return (
        <div className={'recipe-grid__subheading--wrapper display-flex'}>
            <div className='display-flex flex-column'>
                {path !== '/recipe-box' ? <Button className='recipe-items__button--back' startIcon={<ArrowBackIosIcon />} onClick={() => history.push('/recipe-box')}>Recipe Box</Button> : null}
                <div className='display-flex align-center'>
                    {path === '/recipe-box' ? null : <h2 className='recipe-grid__subheading--recipe-folder-name color-222 mb-0'>{listName}</h2>}
                    {listName !== 'Saved Recipes' && listName !== 'Cooked Recipes' && listName !== 'Recently Viewed Recipes' ?
                        <MoreHorizIcon className='recipe-grid__subheading--icon-more pointer color-717171' onClick={handlePopover} /> : null}
                    <Popover
                        id={popoverID}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}>
                        <div>
                            <Typography className='recipe-grid__subheading--button-rename-folder pointer color-222' onClick={toggleCreating}>
                                <button className='pointer color-222'>Rename</button>
                            </Typography>
                            <Typography className='recipe-grid__subheading--button-delete-folder pointer color-222' onClick={deleteRecipeList}>
                                <button className='pointer'>Delete</button>
                            </Typography>
                        </div>
                    </Popover>
                </div>
                {path === '/recipe-box' ? null : numOfRecipes > 0 ? <p className='mt-0 color-717171'>{numOfRecipes} {numOfRecipes === 1 ? 'recipe' : 'recipes'}</p> :
                    <p className='mt-0 color-717171'>No recipes yet</p>}
            </div>
            {path === '/recipe-box/cooked' || path === '/recipe-box/recent' ? null :
                <div className='recipe-grid__subheading--search-input display-flex flex-row align-center'>
                    {/* <div className='recipe-grid__subheading--search-input display-flex flex-row align-center'> */}
                        <SearchIcon className='icon--black recipe-grid__subheading--search-bar-search' />
                        <input
                            className='recipe-grid__subheading--search-bar'
                            type='text'
                            placeholder={document.title === 'Saved Recipes' ? 'Search your saved recipes' : 'Search this folder'}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? dispatch({ type: 'FETCH_RECIPES', payload: searchQuery }) : null}
                            value={searchQuery} />
                        {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray recipe-grid__subheading--search-bar-cancel' /> : null}
                    {/* </div> */}
                    <Button className='no-transform color-white recipe-grid-subhheading__button-go' onClick={() => { dispatch({ type: 'FETCH_RECIPES', payload: searchQuery }) }}>Go</Button>
                </div>
            }
            {/* {path === '/recipe-box' ? <h3 className='color-black'>Saved Recipes</h3> : null} */}
            {/* Dialog for creating a new recipe folder. */}
            <Dialog open={isCreating}
                onClose={toggleCreating}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        saveRecipeListName(newListName);
                        toggleCreating(event);
                    },
                }}>
                <div className='recipe-grid__subheading--dialog-wrapper display-flex justify-sb'>
                    <DialogTitle className='mb-0 pb-0'>Rename Folder</DialogTitle>
                    <Button className='recipe-grid__subheading--button-cancel no-transform mb-0 pb-0' onClick={() => setIsCreating(false)}>Cancel</Button>
                </div>
                <DialogContent>
                    <TextField
                        autoFocus
                        className='recipe-grid__subheading--dialog-textfield'
                        id='Folder title'
                        name='Folder title'
                        fullWidth
                        variant='standard'
                        defaultValue={listName}
                        onChange={e => setNewListName(e.target.value)}
                        value={newListName} />
                </DialogContent>
                <DialogActions>
                    <div className='display-flex flex-column align-center width-100'>
                        <div className='recipe-grid__subheading--actions-first-row width-100'>
                            {/* Buttons for cancelling or saving the new recipe folder. */}
                            <Button className='recipe-grid__subheading__button-rename-folder width-100 no-transform color-white' onClick={() => saveRecipeListName(newListName)}
                                variant='outlined' type='submit'>Rename</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RecipeGridSubheading;
