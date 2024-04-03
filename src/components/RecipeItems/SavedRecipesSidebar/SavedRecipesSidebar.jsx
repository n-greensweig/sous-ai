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
import { Button, TextField } from '@mui/material';

function SavedRecipesSidebar() {
    // Hooks for dispatching actions and selecting a slice of the Redux store.
    const dispatch = useDispatch();
    const recipeLists = useSelector(store => store.recipeListsReducer);

    // State hooks for managing the creation process and input value of the new recipe list.
    const [isCreating, setIsCreating] = useState(false); // Controls the dialog's visibility.
    const [listName, setListName] = useState(''); // Stores the new recipe list's name.

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

    return (
        <div className='sidebar__container'>
            <div className="sidebar-content">
                <p><BookmarkIcon className='sidebar__icon' /> Saved Recipes</p>
                <p><CheckCircleIcon className='sidebar__icon' /> Cooked Recipes</p>
                <p><AccessTimeIcon className='sidebar__icon' /> Recently Viewed</p>
                <p><ListAltIcon className='sidebar__icon' /> Grocery List</p>
                <p className='sidebar__p--your-folders'>Your folders</p>
                <div onClick={toggleCreating} style={{ display: 'flex', flexDirection: 'row', }}>
                        <Button className='icon--gray-border'><AddIcon className='sidebar__icon sidebar__icon--add' /></Button>
                    <p>New Folder</p>
                </div>
                {recipeLists && recipeLists.map((list, index) => (
                    <p key={index} style={{ color: 'black' }}>{list.list_name}</p>
                ))}
            </div>
            {/* Dialog for creating a new recipe list. */}
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
                <DialogTitle>Create new recipe list</DialogTitle>
                <DialogContent>
                    <DialogContentText>New recipe list</DialogContentText>
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
                            {/* Buttons for cancelling or saving the new recipe list. */}
                            <Button style={{ width: '50%', color: 'gray' }} onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button variant="outlined" type="submit" style={{ width: '50%', color: '#DAA520', borderColor: '#DAA520' }}>Save</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SavedRecipesSidebar;