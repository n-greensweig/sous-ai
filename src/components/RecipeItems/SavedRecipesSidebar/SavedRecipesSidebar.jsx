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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Importing Button and TextField components from Material UI for UI elements.
import { Button, TextField, useTheme, useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SavedRecipesSidebar() {
    // Hooks for dispatching actions and selecting a slice of the Redux store.
    const dispatch = useDispatch();
    const history = useHistory();
    const recipeLists = useSelector(store => store.recipeListsReducer);

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

    return (
        isXsScreen || isSmScreen ? null :
            <div className='sidebar__container'>
                <div className="sidebar-content">
                    <p onClick={() => navigateTo('/recipe-box')}
                        onMouseDown={() => handleSetActiveItem('saved')}
                        onMouseUp={handleClearActiveItem}
                        onMouseLeave={handleClearActiveItem}
                        style={{
                            backgroundColor: document.title === 'Saved Recipes' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Saved Recipes' ? 'bold' : 'normal'
                        }}>
                        <BookmarkIcon className='sidebar__icon' style={{ fill: activeItem === 'saved' ? '#767676' : 'black' }} /> Saved Recipes
                    </p>
                    <p onClick={() => navigateTo('/recipe-box/cooked')}
                        onMouseDown={() => handleSetActiveItem('cooked')}
                        onMouseUp={handleClearActiveItem}
                        onMouseLeave={handleClearActiveItem}
                        style={{
                            backgroundColor: document.title === 'Cooked Recipes' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Cooked Recipes' ? 'bold' : 'normal'
                        }}>
                        <CheckCircleIcon className='sidebar__icon' style={{ fill: activeItem === 'cooked' ? '#767676' : 'black' }} /> Cooked Recipes
                    </p>
                    <p onClick={() => navigateTo('/recipe-box/recent')}
                        onMouseDown={() => handleSetActiveItem('recent')}
                        onMouseUp={handleClearActiveItem}
                        onMouseLeave={handleClearActiveItem}
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
                        style={{
                            backgroundColor: document.title === 'Grocery List' ? '#F8F8F5' : 'inherit',
                            fontWeight: document.title === 'Grocery List' ? 'bold' : 'normal'
                        }}>
                        <ListAltIcon className='sidebar__icon' style={{ fill: activeItem === 'grocery' ? '#767676' : 'black' }} /> Grocery List
                    </p>
                    <span className='sidebar__span--your-folders'>Your folders</span>
                    <div onClick={toggleCreating} className='div__icon__p--new-folder'>
                        <Button className='icon--gray-border'
                        ><AddIcon className='sidebar__icon sidebar__icon--add' /></Button>
                        <p className='p__new-folder'>New Folder</p>
                    </div>
                    {recipeLists && recipeLists.map((list, index) => (
                        <p key={index}
                            onClick={() => {
                                document.title = `Your Recipe Box - ${list.list_name}`;
                                history.push(`/recipe-box/${list.id}`);
                            }}
                            style={{
                                backgroundColor: document.title === `Your Recipe Box - ${list.list_name}` ? '#F8F8F5' : 'inherit',
                            }}
                        ><button key={index} style={{ cursor: 'pointer', fontWeight: document.title === `Your Recipe Box - ${list.list_name}` ? 'bold' : 'normal' }}>{list.list_name}</button></p>
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
                    <DialogTitle>Create new recipe folder</DialogTitle>
                    <DialogContent>
                        <DialogContentText>New recipe folder</DialogContentText>
                        <TextField autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            fullWidth
                            variant="standard"
                            defaultValue={listName}
                            onChange={e => setListName(e.target.value)}
                            style={{ padding: '1px' }} />
                    </DialogContent>
                    <DialogActions>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div className="first-row" style={{ width: '100%', marginBottom: '20px' }}>
                                {/* Buttons for cancelling or saving the new recipe folder. */}
                                <Button style={{ width: '50%', color: 'gray' }} onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button variant="outlined" type="submit" style={{ width: '50%', color: '#DAA520', borderColor: '#DAA520' }}>Save</Button>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            </div >
    )
}

export default SavedRecipesSidebar;