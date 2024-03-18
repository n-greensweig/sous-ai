import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button, TextField } from '@mui/material';

function NewRecipeList() {

    const [isCreating, setIsCreating] = useState(false);
    const [listName, setListName] = useState('');

    const saveRecipeList = (e, listName) => {
        e.preventDefault();
        console.log('Saving new recipe list:', listName);
        toggleEditing();
    };

    const toggleEditing = () => isCreating ? setIsCreating(false) : setIsCreating(true);

    useEffect(() => {
        console.log('NewRecipeList mounted');
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0px' }}>
            <Button style={{ marginTop: '10%' }} onClick={e => toggleEditing(e)} className="new-recipe-button">New Recipe List</Button>
            <Dialog open={isCreating}
                onClose={e => toggleEditing(e)}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        saveRecipeList(listName);
                        toggleEditing(event);
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
                        onChange={e => {
                            console.log('List name:', e.target.value);
                            setListName(e.target.value);
                        }}
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