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
function RecipeGridSubheading({ listName, numOfRecipes, searchQuery, setSearchQuery, id, isXsScreen, isSmScreen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCreating, setIsCreating] = useState(false); // Controls the dialog's visibility.
    const [newListName, setNewListName] = useState(listName); // Stores the new recipe list's name.
    const dispatch = useDispatch();
    const history = useHistory();

    // Toggles the isCreating state, controlling the visibility of the creation dialog.
    const toggleCreating = () => setIsCreating(!isCreating);

    const handlePopover = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const saveRecipeListName = (newListName) => {
        dispatch({ type: 'UPDATE_RECIPE_LIST_NAME', payload: { id, newListName } });
    };

    const deleteRecipeList = () => {
        dispatch({ type: 'REMOVE_RECIPE_LIST', payload: id });
        history.push('/recipe-box');
        dispatch({ type: 'FETCH_RECIPES', payload: searchQuery });
    };

    const open = Boolean(anchorEl);
    const popoverID = open ? 'simple-popover' : undefined;

    useEffect(() => {
        // console.log('listName:', listName);
    }, [listName]);


    return (
        <div style={{
            display: 'flex', flexDirection: isXsScreen || isSmScreen ? 'column-reverse' : 'row',
            justifyContent: 'space-between', alignItems: 'center', marginTop: isXsScreen || isSmScreen
                ? '50px' : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <h2 style={{ marginLeft: 'inherit', color: '#222', marginBottom: '0px' }}>{listName}</h2>
                    {listName !== 'Saved Recipes' && listName !== 'Cooked Recipes' && listName !== 'Recently Viewed Recipes' ?
                        <MoreHorizIcon onClick={handlePopover} sx={{ color: '#717171', marginLeft: '5px', cursor: 'pointer', marginTop: 'auto' }} /> : null}
                    <Popover
                        id={popoverID}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div>
                            <Typography onClick={toggleCreating} sx={{
                                borderBottom: '1px solid #ccc', padding: '10px', cursor: 'pointer', color: '#222', fontFamily: 'inherit',
                                '&:hover': {
                                    backgroundColor: '#c0c0c0',
                                },
                            }}>
                                <button style={{ cursor: 'pointer', color: '#222' }}>Rename</button>
                            </Typography>
                            <Typography onClick={deleteRecipeList} sx={{
                                padding: '10px', cursor: 'pointer', color: '#222', fontFamily: 'inherit',
                                '&:hover': {
                                    backgroundColor: '#c0c0c0',
                                },
                            }}>
                                <button style={{ cursor: 'pointer' }}>Delete</button>
                            </Typography>
                        </div>
                    </Popover>
                </div>
                {numOfRecipes > 0 ? <p style={{ marginTop: 0, color: '#717171', }}>{numOfRecipes} {numOfRecipes === 1 ? 'recipe' : 'recipes'}</p> :
                    <p style={{ marginTop: 0, color: '#717171', }}>No recipes yet</p>}
            </div>
            <div className="search__input" style={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', position: isXsScreen || isSmScreen ? 'relative' : 'absolute', right: isXsScreen || isSmScreen ? 0 : '2%', 
                margin: isXsScreen || isSmScreen ? '0px' : 0,
            }}>
                <SearchIcon className='icon--black search' />
                <input
                    type="text"
                    placeholder="Search your saved recipes"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' /> : null}
            </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid gray', }}>
                    <DialogTitle sx={{ paddingBottom: '0px', marginBottom: '0px', }}>Rename Folder</DialogTitle>
                    <Button style={{ color: 'gray', textTransform: 'none', paddingBottom: '0px', marginBottom: '0px', }} onClick={() => setIsCreating(false)}>Cancel</Button>
                </div>
                <DialogContent>
                    <TextField autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        fullWidth
                        variant="standard"
                        defaultValue={listName}
                        onChange={e => setNewListName(e.target.value)}
                        value={newListName}
                        style={{ padding: '1px' }} />
                </DialogContent>
                <DialogActions>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div className="first-row" style={{ width: '100%', marginBottom: '20px' }}>
                            {/* Buttons for cancelling or saving the new recipe folder. */}
                            <Button onClick={() => saveRecipeListName(newListName)}
                                variant="outlined" type="submit" style={{ width: '50%', backgroundColor: '#df321b', color: 'white', border: '1px solid #df321b', borderRadius: '5%', textTransform: 'none' }}>Rename</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RecipeGridSubheading;
