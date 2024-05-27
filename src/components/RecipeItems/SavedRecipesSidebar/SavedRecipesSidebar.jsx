import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import './SavedRecipesSidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Importing Dialog components from Material UI for modal dialog functionality.
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// Importing Button and TextField components from Material UI for UI elements.
import { Button, TextField, useTheme, useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SavedRecipesSidebar() {
    // Hooks for dispatching actions and selecting a slice of the Redux store.
    const dispatch = useDispatch();
    const history = useHistory();
    const recipeLists = useSelector(store => store.recipeListsReducer);
    const recipeListPhotos = useSelector(store => store.recipeListPhotosReducer);

    // State hooks for managing the creation process and input value of the new recipe list.
    const [isCreating, setIsCreating] = useState(false); // Controls the dialog's visibility.
    const [listName, setListName] = useState(''); // Stores the new recipe list's name.
    const [activeItem, setActiveItem] = useState(null);

    // Function to save the new recipe list. Dispatches actions to the store and resets local state.
    const saveRecipeList = listName => {
        dispatch({ type: 'SAVE_RECIPE_LIST', payload: { listName } });
        toggleCreating();
        setListName('');
        dispatch({ type: 'FETCH_RECIPE_LISTS' }); // Triggers a fetch for the updated lists.
    };

    // Effect hook to fetch recipe lists when the component mounts.
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_LISTS' });
        dispatch({ type: 'FETCH_RECIPE_LIST_PHOTOS' });
    }, []); // Dependency array is empty, so this runs once on mount.

    // Toggles the isCreating state, controlling the visibility of the creation dialog.
    const toggleCreating = () => setIsCreating(!isCreating);

    // MUI theme hooks for responsive design
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
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

    const hasPhoto = [];

     // Function to handle the drag start event
     const handleDragStart = (event, target) => {
        if (target === 'saved') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box'); // Set the URL to drag
        } else if (target === 'cooked') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box/cooked'); // Set the URL to drag
        } else if (target === 'recent') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box/recent'); // Set the URL to drag
        }
    };

    return (
        isXsScreen || isSmScreen ? null :
            <div className='sidebar__container'>
                <div className="sidebar-content">
                    <p className='sidebar__p--first sidebar__margin--right' onClick={() => navigateTo('/recipe-box')}
                        onMouseDown={() => handleSetActiveItem('saved')}
                        onMouseUp={handleClearActiveItem}
                        onDragStart={event => handleDragStart(event, 'saved')}
                        onDragEnd={handleClearActiveItem}
                        draggable
                        style={{
                            backgroundColor: document.title === 'Saved Recipes' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Saved Recipes' ? 'bold' : 'normal',
                        }}>
                            <BookmarkIcon className='sidebar__icon' style={{ fill: activeItem === 'saved' ? '#767676' : 'black' }} /> Saved Recipes
                    </p>
                    <p onClick={() => navigateTo('/recipe-box/cooked')}
                        onMouseDown={() => handleSetActiveItem('cooked')}
                        onMouseUp={handleClearActiveItem}
                        onDragStart={event => handleDragStart(event, 'cooked')}
                        onDragEnd={handleClearActiveItem}
                        draggable
                        className='sidebar__margin--right'
                        style={{
                            backgroundColor: document.title === 'Cooked Recipes' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Cooked Recipes' ? 'bold' : 'normal'
                        }}>
                        <CheckCircleIcon className='sidebar__icon' style={{ fill: activeItem === 'cooked' ? '#767676' : 'black' }} /> Cooked Recipes
                    </p>
                    <p onClick={() => navigateTo('/recipe-box/recent')}
                        onMouseDown={() => handleSetActiveItem('recent')}
                        onMouseUp={handleClearActiveItem}
                        onDragStart={event => handleDragStart(event, 'recent')}
                        onDragEnd={handleClearActiveItem}
                        draggable
                        className='sidebar__margin--right'
                        style={{
                            backgroundColor: document.title === 'Recently Viewed Recipes' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Recently Viewed Recipes' ? 'bold' : 'normal'
                        }}>
                        <AccessTimeIcon className='sidebar__icon' style={{ fill: activeItem === 'recent' ? '#767676' : 'black' }} /> Recently Viewed
                    </p>
                    <p
                        onMouseDown={() => handleSetActiveItem('grocery')}
                        onMouseUp={handleClearActiveItem}
                        onMouseLeave={handleClearActiveItem}
                        onDragEnd={handleClearActiveItem}
                        draggable
                        className='sidebar__margin--right'
                        style={{
                            backgroundColor: document.title === 'Grocery List' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Grocery List' ? 'bold' : 'normal'
                        }}>
                        <ListAltIcon className='sidebar__icon' style={{ fill: activeItem === 'grocery' ? '#767676' : 'black' }} /> Grocery List
                    </p>
                    <span className='sidebar__span--your-folders sidebar__margin--right'>Your folders</span>
                    <div onClick={toggleCreating} className='div__icon__span--new-folder'>
                        <Button className='icon--gray-border'
                        ><AddIcon className='sidebar__icon sidebar__icon--add' /></Button>
                        <span className='span__new-folder'>New Folder</span>
                    </div>
                    {recipeLists && recipeLists.map((list) => (
                        <div key={list.id} className="div__icon__p--folder div__color-change">
                            {/* Find the photo that matches the current list ID */}
                            <div className='sidebar__user-folders' style={{
                                display: 'flex', alignItems: 'center', cursor: 'pointer', boxSizing: 'border-box',
                                backgroundColor: document.title.includes(list.list_name) ? '#F8F8F5' : 'inherit',
                                fontWeight: document.title.includes(list.list_name) ? 'bold' : 'normal',
                            }}
                                onClick={() => {
                                    document.title = `Your Recipe Box - ${list.list_name}`;
                                    history.push(`/recipe-box/${list.id}`);
                                }}
                            >
                                {recipeListPhotos && recipeListPhotos.map((photo) => {
                                    if (photo.list_id.includes(list.id)) {
                                        hasPhoto.push(list.id);
                                        return (
                                            <div style={{ display: 'flex' }}>
                                                <img key={photo.id} src={photo.display_photo} alt={list.list_name} className="folder__photo"
                                                    style={{ height: '40px', width: '40px', borderRadius: '4px', }}
                                                />
                                            </div>
                                        )
                                    }
                                })}
                                {/* If there is no photo for the current list, render the list without a photo */}
                                {hasPhoto.includes(list.id) ? null : <div style={{ display: 'flex' }}>
                                    <img src={'images/empty-folder/empty-folder.jpeg'} alt={list.list_name} className="folder__photo"
                                        style={{ height: '40px', width: '40px', borderRadius: '4px', }}
                                    />
                                </div>}
                                <p onClick={() => {
                                    document.title = `Your Recipe Box - ${list.list_name}`;
                                    history.push(`/recipe-box/${list.id}`);
                                }}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >{list.list_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Dialog for creating a new recipe folder. */}
                <Dialog open={isCreating}
                    onClose={toggleCreating}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            saveRecipeList(listName);
                            toggleCreating(event);
                        },
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid gray', }}>
                        <DialogTitle sx={{ paddingBottom: '0px', marginBottom: '0px', }}>New Folder</DialogTitle>
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
                            placeholder='Enter folder name'
                            onChange={e => setListName(e.target.value)}
                            style={{ padding: '1px' }} />
                    </DialogContent>
                    <DialogActions>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div className="first-row" style={{ width: '100%', marginBottom: '20px' }}>
                                {/* Buttons for cancelling or saving the new recipe folder. */}
                                <Button variant="outlined" type="submit" style={{ width: '50%', backgroundColor: '#df321b', color: 'white', border: '1px solid #df321b', borderRadius: '5%', textTransform: 'none' }}>Create</Button>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
    )
}

export default SavedRecipesSidebar;