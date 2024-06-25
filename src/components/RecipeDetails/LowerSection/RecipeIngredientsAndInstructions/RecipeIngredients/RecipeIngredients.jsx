import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarLoader } from 'react-spinners';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function RecipeIngredients({ ingredients, servings, isSmScreen, isXsScreen, replaceWithCommas, isInGroceryList, title, id }) {

    const dispatch = useDispatch();
    const [inGroceryList, setInGroceryList] = useState(isInGroceryList);

    // State to toggle the editing mode for the recipe details
    const [isViewing, setIsViewing] = useState(false);

    // Function to toggle the editing mode for the recipe details
    const toggleViewing = e => {
        if (isViewing) {
            setIsViewing(false);
        } else {
            setIsViewing(true);
        }
    };

    const updateGroceryList = e => {
        e.preventDefault();
        setInGroceryList(prevState => {
            const newState = !prevState;
            dispatch({ type: 'UPDATE_GROCERY_LIST', payload: { id, isInGroceryList: newState } });
            return newState;
        });
    };


    useEffect(() => {
        setInGroceryList(isInGroceryList);
    }, [isInGroceryList, isInGroceryList]);

    return (
        <div className="ingredients" style={{
            borderTop: isSmScreen || isXsScreen ? '2px solid black' : null,
            marginRight: isSmScreen || isXsScreen ? null : '30px', alignSelf: isSmScreen || isXsScreen ? 'center' : null,
            width: isSmScreen || isXsScreen ? '80%' : null
        }}>
            <p style={{
                color: 'black', fontWeight: 'bold', marginTop: isSmScreen || isXsScreen ? '10px' : null,
                textAlign: isSmScreen || isXsScreen ? 'left' : null, marginTop: isSmScreen || isXsScreen ? '0px' : null
            }}><span style={{
                borderTop: isSmScreen || isXsScreen ? null : '2px solid black',
                fontSize: '1.1rem'
            }}>INGREDIENTS</span></p>

            <p style={{ color: 'black', textAlign: isSmScreen || isXsScreen ? 'left' : null }}><strong>Yield:</strong> {!servings ? '' : isNaN(servings) ? servings : <span>{servings} servings</span>}</p>

            <ul style={{ listStyleType: 'none', paddingLeft: '0px', textAlign: isSmScreen || isXsScreen ? 'left' : null }}>
                {Array.isArray(ingredients) && ingredients.map((ingredient, index) => ingredient.length > 2 ? <li key={index} style={{ color: "black", marginBottom: '10px' }}>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
            </ul>
            <p>{inGroceryList ? <span onClick={e => updateGroceryList(e)}>Added!<button>Open grocery list</button></span> : <button onClick={e => updateGroceryList(e)}>Add ingredients to your grocery list</button>}</p>
            <Dialog open={isViewing}
                onClose={e => toggleViewing(e)}
                PaperProps={{
                    component: 'form',
                    // onSubmit: (event) => {
                    //     event.preventDefault();
                    //     saveEditedTitle(event, id);
                    //     toggleEditing(event);
                    // },
                }}>
                <DialogTitle>Set recipe title</DialogTitle>
                {/* <DialogContent>
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
                </DialogActions> */}
            </Dialog>
        </div>
    );
}

export default RecipeIngredients;