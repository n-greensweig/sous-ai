import { useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';

import { useEffect } from "react";
import { useSelector } from "react-redux";

function NewRecipeList() {

    const dispatch = useDispatch();
    const recipeLists = useSelector(store => store.recipeListsReducer);

    const [isCreating, setIsCreating] = useState(false);
    const [listName, setListName] = useState('');

    const saveRecipeList = listName => {
        dispatch({ type: 'SAVE_RECIPE_LIST', payload: { listName } });
        toggleCreating();
        setListName('');
        dispatch({ type: 'FETCH_RECIPE_LISTS' });
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_LISTS' });
    }, []);

    const toggleCreating = () => isCreating ? setIsCreating(false) : setIsCreating(true);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0px' }}>
            {recipeLists && recipeLists.map((list, index) => (
                <p key={index} style={{ color: 'black' }}>{list.list_name}</p>
            ))}
            <Button style={{ marginTop: '10%' }} onClick={toggleCreating} className="new-recipe-button">New Recipe List</Button>
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
                            <Button style={{ width: '50%', color: 'gray' }} onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button variant="outlined" type="submit" style={{ width: '50%', color: '#DAA520', borderColor: '#DAA520' }}>Save</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewRecipeList;