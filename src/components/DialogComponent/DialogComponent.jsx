import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarLoader } from 'react-spinners';
import './DialogComponent.css';
function DialogComponent({ isEditing, setIsEditing, toggleEditing, isLoading, onFileChange,
    imagePath, title, setTitle, id, saveEditedTitle, removeRecipe }) {
    return (
        <Dialog open={isEditing}
            onClose={e => toggleEditing(e)}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    saveEditedTitle(event, id);
                    toggleEditing(event);
                },
            }}>
            <DialogTitle>Set recipe title</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New recipe title
                </DialogContentText>
                <TextField className='recipe-details-edit-recipe-dialog--text-field' autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    fullWidth
                    variant="standard"
                    defaultValue={title}
                    onChange={e => setTitle(e.target.value)} />

                <div className='recipe-details__dialog-content-wrapper'>
                    <p className='recipe-details__dialog-content--upload'>Upload a photo of this recipe!</p>
                    <form className='recipe-details__dialog-content--form'>
                        <input type="file" accept="image/*" onChange={onFileChange} />
                        {isLoading && <BarLoader className='bar-loader' color="black" />}
                        <br />
                        {/* Image preview */}
                        {imagePath === '' ? null : <img className='image-upload-preview' src={imagePath} />}
                        <br />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                {!isLoading && <div className='recipe-details__dialog--buttons'>
                    <div className='recipe-details__dialog--buttons-first-row'>
                        <Button className='recipe-details__dialog--buttons-cancel' onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button className='recipe-details__dialog--buttons-save' variant='outlined' type='submit'>Save</Button>
                    </div>
                    <div className='recipe-details__dialog--buttons-second-row'>
                        <Button className='recipe-details__dialog--buttons-delete' variant='outlined' startIcon={<DeleteIcon className='recipe-details__dialog--icon-delete' />}
                            onClick={() => removeRecipe(id)}>
                            Delete Recipe
                        </Button>
                    </div>
                </div>}
            </DialogActions>
        </Dialog>
    );
}
export default DialogComponent;