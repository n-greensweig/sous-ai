import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarLoader } from 'react-spinners';

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
                <TextField autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    fullWidth
                    variant="standard"
                    defaultValue={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{ padding: '1px' }} />

                <div style={{ margin: '10px' }}>
                    <p style={{ marginBottom: 0 }}>Upload a photo of this recipe!</p>
                    <form style={{ marginTop: 0 }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        {isLoading && <BarLoader color="#DAA520" />}
                        <br />
                        {
                            // Image preview
                            imagePath === '' ? (
                                null
                            ) : (
                                <img style={{ maxWidth: '150px' }} src={imagePath} />
                            )
                        }
                        <br />
                    </form>
                </div>

            </DialogContent>
            <DialogActions>
                {!isLoading && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div className="first-row" style={{ width: '100%', marginBottom: '20px' }}>
                        <Button style={{ width: '50%', color: 'gray' }} onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button variant="outlined" type="submit" style={{ width: '50%', color: '#DAA520', borderColor: '#DAA520' }}>Save</Button>
                    </div>
                    <div className="second-row" style={{ width: '100%' }}>
                        <Button variant="outlined" startIcon={<DeleteIcon style={{ fill: '#DC143C' }} />}
                            onClick={() => removeRecipe(id)} style={{ color: '#DC143C', borderColor: '#DC143C', flexGrow: '1', width: '100%', alignSelf: 'stretch' }}>
                            Delete Recipe
                        </Button>
                    </div>
                </div>}
            </DialogActions>
        </Dialog>
    );
}

export default DialogComponent;