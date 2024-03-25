// Importing useState and useEffect hooks from React for managing component state and side effects.
import { useState, useEffect } from "react";
// Importing useDispatch and useSelector hooks from react-redux for dispatching actions and accessing the Redux store.
import { useDispatch, useSelector } from "react-redux";
// Importing Dialog components from Material UI for modal dialog functionality.
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Importing Button and TextField components from Material UI for UI elements.
import { Button, TextField } from '@mui/material';

// Functional component definition for NewRecipeList.
function NewRecipeList() {
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

    // Component return statement. Includes the recipe list display and controls for creating a new list.
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0px' }}>
            {/* Mapping through recipeLists to display them. */}
            {recipeLists && recipeLists.map((list, index) => (
                <p key={index} style={{ color: 'black' }}>{list.list_name}</p>
            ))}
            {/* Button to toggle the dialog for creating a new recipe list. */}
            <Button style={{ marginTop: '10%' }} onClick={toggleCreating} className="new-recipe-button">New Recipe List</Button>
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
    );
}

// Exporting the component for use in other parts of the application.
export default NewRecipeList;